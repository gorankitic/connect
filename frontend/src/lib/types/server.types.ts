export type ServerListItem = {
    _id: string;
    name: string;
    avatarUuid: string;
    createdAt: string;
}

export type Server = {
    _id: string;
    owner: string;
    name: string;
    avatarUuid: string;
    inviteCode: string;
    createdAt: string;
}