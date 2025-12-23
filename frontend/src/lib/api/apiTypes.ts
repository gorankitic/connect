// types
import type { User } from "@/lib/types/user.types";
import type { Session } from "@/lib/types/session.types";
import type { Server, ServerListItem } from "@/lib/types/server.types";
import type { Member } from "@/lib/types/member.types";
import type { Channel } from "@/lib/types/channel.types";
import type { Message } from "@/lib/types/message.types";

// Zod error response from server
export type FieldError = {
    path: string;
    message: string;
}

// Error that server returns
export type ErrorResponse = {
    status: "fail" | "error";
    message: string;
    errors?: FieldError[];
}

// Normalized error that the client will use everywhere
export type NormalizedError = {
    status: "fail" | "error";
    message: string;
    statusCode: number;
    errors?: FieldError[];
}

export type SuccessResponse = {
    status: "success";
    message?: string;
}

export type GetUserResponse = {
    status: "success";
    user: User;
}

export type GetUploadSignatureResponse = {
    status: "success";
    secureSignature: string;
    secureExpire: string;
    publicKey: string;
}

export type GetSessionsResponse = {
    status: "success";
    currentSessionId: string;
    sessions: Session[];
}

export type CreateServerResponse = {
    status: "success";
    data: {
        serverId: string;
    }
}

export type GetServersResponse = {
    status: "success";
    results: number;
    data: {
        servers: ServerListItem[];
    }
}

export type GetServerResponse = {
    status: "success";
    data: {
        server: Server;
    }
}

export type JoinServerResponse = {
    status: "success";
    data: {
        serverId: string;
    }
}

export type GetMembersResponse = {
    status: "success";
    results: number;
    data: {
        members: Member[];
    }
}

export type GetMemberResponse = {
    status: "success",
    data: {
        member: Member;
    }
}

export type GetChannelsResponse = {
    status: "success";
    results: number;
    data: {
        channels: Channel[];
    }
}

export type GetOrCreateConversationResponse = {
    status: "success";
    data: {
        conversation: {
            conversationId: string;
            currentMember: Member;
            otherMember: Member;
        }
    }
}

export type CreateChannelMessageResponse = {
    status: "success";
    data: {
        message: Message;
    }
}

export type ChannelMessagesPage = {
    messages: Message[];
    nextCursor: string | null;
};

export type GetChannelMessagesResponse = {
    status: "success";
    results: number;
    data: ChannelMessagesPage;
}

export type GetChannelMessagesParams = {
    serverId: string;
    channelId: string;
    limit?: number;
    cursor?: string | null;
}