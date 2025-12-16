// modules
import mongoose from "mongoose";
// models
import { Server } from "@/models/server.model";
import { Member } from "@/models/member.model";
import { Channel } from "@/models/channel.model";
// schemas & types
import { CreateServerDTO } from "@/lib/types/server.types";
import { UpsertServerSchema } from "@/lib/schemas/server.schemas";
// utils
import { AppError } from "@/lib/utils/AppError";
import { generateToken } from "@/lib/utils/crypto";

export const createNewServer = async ({ name, avatarUuid, owner }: CreateServerDTO) => {
    // Generate invite code
    const inviteCode = generateToken(16);
    // MongoDB transactions ensure that a series of operations on the database either all succeed or all fail
    // Start a session for transaction (keeps track of all operations that are part of the transaction)
    const session = await mongoose.startSession();
    try {
        // Start transaction
        session.startTransaction();
        // Create a server document
        const [server] = await Server.create([{ name, avatarUuid, owner, inviteCode }], { session });
        // Create a admin member & default #general channel in parallel
        await Promise.all([
            // Create a member document
            Member.create([{ user: owner, server: server._id, role: "ADMIN" }], { session }),
            // Create a default channel document
            Channel.create([{ name: "general", server: server._id }], { session }),
        ]);
        // Commit successfull transaction
        await session.commitTransaction();
        return server;
    } catch (error) {
        // (On error) abort the transaction, reverting all changes made in that transaction
        await session.abortTransaction();
        throw new AppError("Creating server failed.", 500);
    } finally {
        // Finish transaction
        session.endSession();
    }
}

export const getAllUserServers = async (userId: string) => {
    // Find all server IDs where user is a member
    const memberships = await Member.find({ user: userId }).select("server");
    const serverIds = memberships.map(m => m.server);

    // Find all server documents
    const servers = await Server
        .find({ _id: { $in: serverIds } })
        .select("name avatarUuid")
        .sort({ createdAt: 1 });

    return servers;
}

export const getServerById = async (serverId: string) => {
    const server = await Server
        .findById(serverId)
        .select("_id name avatarUuid inviteCode owner")
        .populate({ path: "channels", select: "_id name type" });

    if (!server) {
        throw new AppError("That document does not exist.", 404);
    }

    return server;
}

export const updateServerById = async (serverId: string, { name, avatarUuid }: UpsertServerSchema) => {
    const server = await Server.findByIdAndUpdate(serverId, { name, avatarUuid }, { new: true, runValidators: true });

    if (!server) {
        throw new AppError("That document does not exist.", 404);
    }
    return server;
}

export const createNewInviteCode = async (serverId: string) => {
    const inviteCode = generateToken(16);
    const server = await Server.findByIdAndUpdate(serverId, { inviteCode }, { new: true, runValidators: true });

    if (!server) {
        throw new AppError("That document does not exist.", 404);
    }
    return server;
}

export const deleteServerById = async (serverId: string) => {
    // MongoDB transactions ensure that a series of operations on the database either all succeed or all fail
    // Start a session for transaction (keeps track of all operations that are part of the transaction)
    const session = await mongoose.startSession();
    try {
        // Start transaction
        session.startTransaction();
        // Find the server
        const server = await Server.findById(serverId).session(session);
        if (!server) {
            throw new AppError("Server not found.", 404);
        }
        // Delete all channels and members linked to server in parallel
        await Promise.all([
            // Delete all channels
            Channel.deleteMany({ server: serverId }).session(session),
            // Delete all members
            Member.deleteMany({ server: serverId }).session(session)
        ]);
        // Delete server document
        await server.deleteOne({ session });
        // Commit successfull transaction
        await session.commitTransaction();
    } catch (error) {
        // (On error) abort the transaction, reverting all changes made in that transaction
        await session.abortTransaction();
        throw new AppError("Deleting server failed.", 500);
    } finally {
        // Finish transaction
        session.endSession();
    }
}