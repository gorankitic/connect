// constants
import { MEMBER_ROLES } from "@/lib/constants/member.constants";
// types
import { Types } from "mongoose";

export type MemberRole = typeof MEMBER_ROLES[keyof typeof MEMBER_ROLES];

export interface IMember extends Document {
    _id: Types.ObjectId;
    user: Types.ObjectId;
    server: Types.ObjectId;
    role: MemberRole;
}

export type GetServerMembersDTO = {
    serverId: string
    includeEmail?: boolean
}

export type UpdateMemberRoleDTO = {
    serverId: string,
    memberId: string,
    adminId: string,
    role: MemberRole
}

export type RemoveMemberDTO = {
    serverId: string,
    memberId: string
}

export type GetMemberDTO = {
    serverId: string,
    userId: string
}