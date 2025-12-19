export const formatMember = (member: any) => ({
    _id: member._id,
    role: member.role,
    serverId: member.server,
    createdAt: member.createdAt,
    name: member.user.name,
    avatarUuid: member.user.avatarUuid,
    email: member.user.email,
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