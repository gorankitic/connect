// constants
import type { MEMBER_ROLES } from "@/lib/constants/member.constants";

export type MemberRole = typeof MEMBER_ROLES[number];

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