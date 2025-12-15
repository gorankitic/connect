// models
import { Member } from "@/models/member.model";
// types
import { MemberRole } from "@/lib/types/member.types";
// utils
import { AppError } from "@/lib/utils/AppError";

export const findAllServerMembers = async (serverId: string) => {

    const members = await Member
        .find({ server: serverId })
        .populate({ path: "user", select: "name email avatarUuid" })
        .sort({ createdAt: 1 })
        .lean();

    return members;
}

export const updateRole = async (serverId: string, memberId: string, adminId: string, role: MemberRole) => {
    // Prevent creation of additional admins (single-admin rule)
    if (role === "ADMIN") {
        throw new AppError("You are not authorized to perform this action.", 403);
    }

    // Verify that the acting member is an admin member of this server
    const admin = await Member.findOne({ server: serverId, user: adminId });
    if (!admin) {
        throw new AppError("Admin membership not found.", 403);
    }

    // Prevent admin from changing their own role
    if (admin._id.equals(memberId)) {
        throw new AppError("You are not authorized to perform this action.", 403);
    }

    // Find the target member within the same server
    const member = await Member.findOne({ _id: memberId, server: serverId });
    if (!member) {
        throw new AppError("Member not found.", 404);
    }

    // Apply role update
    member.role = role;
    await member.save();

    return member;
}

export const removeMemberFromServer = async (serverId: string, memberId: string, adminId: string) => {
    // Prevent admin removing themselves (single-admin rule)
    if (adminId === memberId) {
        throw new AppError("You are not authorized to perform this action.", 403);
    }

    // Find & delete the target member within the same server
    const deletedMember = await Member.findOneAndDelete({ _id: memberId, server: serverId });

    if (!deletedMember) {
        throw new AppError("Member not found.", 404);
    }
}