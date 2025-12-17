// constants & types
import type { ChannelType } from "@/lib/constants/channel.constants";
import type { MemberRole } from "@/lib/constants/member.constants";

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
    status: "success",
    message?: string
}

export type User = {
    _id: string,
    name: string,
    email: string,
    avatarUuid: string | null,
    isVerified: boolean
}

export type GetUserResponse = {
    status: "success",
    user: User
}

export type GetUploadSignatureResponse = {
    status: "success",
    secureSignature: string,
    secureExpire: string,
    publicKey: string
}

export type Session = {
    userAgent: string
    lastUsedAt: string,
    location: string | null
}

export type GetSessionsResponse = {
    status: "success",
    currentSessionId: string,
    sessions: Session[]
}

export type CreateServerResponse = {
    status: "success",
    server: { _id: string };
}

export type ServerListItem = {
    _id: string,
    name: string,
    avatarUuid: string
}

export type GetServersResponse = {
    status: "success";
    servers: ServerListItem[];
}

export type Channel = {
    _id: string;
    name: string;
    type: ChannelType;
    server: string;
};

export type ServerWithChannels = {
    _id: string;
    name: string;
    avatarUuid: string;
    inviteCode: string;
    owner: string;
    channels: Channel[];
}

export type ServerMember = {
    _id: string;
    role: MemberRole;
    name: string;
    avatarUuid: string;
}

export type GetServerResponse = {
    status: "success";
    server: ServerWithChannels;
    member: ServerMember;
}

export type JoinServerResponse = {
    status: "success";
    serverId: string;
}

export type Member = {
    _id: string;
    role: MemberRole;
    serverId: string;
    createdAt: string;
    name: string;
    avatarUuid: string;
    email: string;
}

export type GetMembersResponse = {
    staus: "success";
    members: Member[]
}