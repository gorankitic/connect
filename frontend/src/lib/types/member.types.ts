// constants
import type { MEMBER_ROLE } from "@/lib/constants/member.constants";

export type MemberRole = typeof MEMBER_ROLE[keyof typeof MEMBER_ROLE];

export type ServerMember = {
    _id: string;
    role: MemberRole;
    name: string;
    avatarUuid: string;
}

export type Member = {
    _id: string;
    role: MemberRole;
    serverId: string;
    createdAt: string;
    name: string;
    avatarUuid: string;
    email?: string;
}