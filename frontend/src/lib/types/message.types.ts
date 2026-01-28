// types
import type { Member, MemberRole } from "@/lib/types/member.types";

export type Message = {
    _id: string;
    content: string;
    channelId?: string;
    conversationId?: string;
    deletedAt?: string;
    createdAt: string;
    updatedAt: string;
    member: Member;
}

export type CanDeleteMessageProps = {
    messageAuthorId: string;
    messageAuthorRole: MemberRole;
    memberId: string | undefined;
    memberRole: MemberRole | undefined;
}