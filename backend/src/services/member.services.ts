// models
import { Member } from "@/models/member.model";
// types
import { GetMemberDTO, GetServerMembersDTO, RemoveMemberDTO, UpdateMemberRoleDTO } from "@/lib/types/member.types";
// utils
import { AppError } from "@/lib/utils/AppError";

export const findServerMembers = async ({ serverId }: GetServerMembersDTO) => {

    const members = await Member
        .find({ server: serverId })
        .populate({ path: "user", select: "name email avatarUuid" })
        .sort({ createdAt: 1 })
        .lean();

    return members;
}

export const updateRole = async ({ serverId, memberId, adminId, role }: UpdateMemberRoleDTO) => {
    // Prevent creation of additional admins (single-admin rule)
    if (role === "ADMIN") {
        throw new AppError("You are not authorized to perform this action.", 403);
    }

    // Prevent admin from changing their own role
    if (adminId === memberId) {
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

export const removeMemberFromServer = async ({ serverId, memberId }: RemoveMemberDTO) => {

    // Find & delete the target member within the same server
    const deletedMember = await Member.findOneAndDelete({ _id: memberId, server: serverId });

    if (!deletedMember) {
        throw new AppError("Member not found.", 404);
    }
}