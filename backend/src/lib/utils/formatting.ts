// modules
import { Types } from "mongoose";

export const formatMember = (member: any) => ({
    _id: member._id,
    role: member.role,
    serverId: member.server,
    createdAt: member.createdAt,
    name: member.user.name,
    avatarUuid: member.user.avatarUuid,
    ...(member.user.email ? { email: member.user.email } : {}),
});

export const formatMessage = (message: any) => ({
    _id: message._id.toString(),
    content: message.content,
    channelId: message.channel?.toString() ?? null,
    conversationId: message.conversation?.toString() ?? null,
    deletedAt: message.deletedAt,
    createdAt: message.createdAt,
    updatedAt: message.updatedAt,
    member: {
        _id: message.sender._id.toString(),
        role: message.sender.role,
        name: message.sender.user.name,
        avatarUuid: message.sender.user.avatarUuid
    }
});

export const formatChannel = (channel: any) => ({
    _id: channel._id.toString(),
    name: channel.name,
    type: channel.type,
    createdAt: channel.createdAt
});

export const formatServers = (server: any) => ({
    _id: server._id.toString(),
    name: server.name,
    avatarUuid: server.avatarUuid,
    createdAt: server.createdAt
});

export const formatServer = (server: any) => ({
    _id: server._id.toString(),
    owner: server.owner.toString(),
    name: server.name,
    avatarUuid: server.avatarUuid,
    inviteCode: server.inviteCode,
    createdAt: server.createdAt
});

export const formatConversation = (conversation: any, currentMemberId: Types.ObjectId) => {
    const isCurrentMemberOne = String(conversation.memberOne._id) === String(currentMemberId);

    return {
        conversationId: conversation._id,
        currentMember: isCurrentMemberOne ? formatMember(conversation.memberOne) : formatMember(conversation.memberTwo),
        otherMember: isCurrentMemberOne ? formatMember(conversation.memberTwo) : formatMember(conversation.memberOne),
    };
};

export const formatNotification = (notification: any) => ({
    _id: notification._id.toString(),
    unreadCount: notification.unreadCount,
    senderId: notification.sender.toString(),
    recipientId: notification.recipient.toString(),
    conversationId: notification.conversation.toString(),
    serverId: notification.server.toString(),
});