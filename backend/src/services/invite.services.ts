// models
import { Member } from "@/models/member.model";
import { Server } from "@/models/server.model";
// utils
import { AppError } from "@/lib/utils/AppError";
// types
import { JoinServerDTO } from "@/lib/types/invite.types";

export const joinServerWithInviteCode = async ({ inviteCode, userId }: JoinServerDTO) => {
    // 1) Find server by unique inviteCode
    const server = await Server.findOne({ inviteCode });
    if (!server) {
        throw new AppError("Invalid or expired invite link.", 404);
    }

    // 2) Check if user is already a member of server
    const existingMember = await Member.findOne({ user: userId, server: server._id });
    if (existingMember) {
        return server._id;
    }

    // 3) Create new server member
    await Member.create({ user: userId, server: server._id });

    return server._id;
}