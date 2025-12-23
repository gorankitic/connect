// types
import type { Member } from "@/lib/types/member.types";

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