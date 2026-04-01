// types
import type { User } from "@/lib/types/user.types";
import type { Session } from "@/lib/types/session.types";
import type { Server, ServerListItem } from "@/lib/types/server.types";
import type { Member } from "@/lib/types/member.types";
import type { Channel } from "@/lib/types/channel.types";
import type { Message } from "@/lib/types/message.types";
import type { UpsertMessageSchema } from "@/lib/schemas/message.schema";

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

export type GetChannelMessagesParams = {
    serverId: string;
    channelId: string;
    limit?: number;
    cursor?: string | null;
}

export type CreateMessageParams = {
    serverId: string;
    targetId: string;
    body: UpsertMessageSchema;
}

export type GetMessagesParams = {
    serverId: string;
    targetId: string;
    limit?: number;
    cursor?: string | null;
}

export type UpdateMessageParams = {
    serverId: string;
    targetId: string;
    messageId: string;
    body: UpsertMessageSchema;
}

export type DeleteMessageParams = {
    serverId: string;
    targetId: string;
    messageId: string;
}

export type MessagesPage = {
    messages: Message[];
    nextCursor: string | null;
}

export type MessagesResponse = {
    status: "success";
    results: number;
    data: MessagesPage;
}

export type MessageResponse = {
    status: "success";
    data: {
        message: Message;
    }
}

export type GetNotificationsParams = {
    serverId: string;
}

export type Notification = {
    _id: string;
    unreadCount: number;
    senderId: string;
    recipientId: string;
    conversationId: string;
    serverId: string;
}

export type NotificationsResponse = {
    status: "success";
    results: number;
    data: {
        notifications: Notification[];
    }
}
