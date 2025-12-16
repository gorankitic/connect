export const formatMember = (member: any) => ({
    _id: member._id,
    role: member.role,
    serverId: member.server,
    createdAt: member.createdAt,
    name: member.user.name,
    avatarUuid: member.user.avatarUuid,
    email: member.user.email,
});