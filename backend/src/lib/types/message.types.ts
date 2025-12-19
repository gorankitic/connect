export type CreateChannelMessageDTO = {
    content: string;
    serverId: string;
    channelId: string;
    currentMemberId: string;
}

export type GetChannelMessagesDTO = {
    serverId: string;
    channelId: string;
}

export type CreateConversationMessageDTO = {
    content: string;
    serverId: string;
    conversationId: string;
    currentMemberId: string;
}

export type GetConversationMessagesDTO = {
    serverId: string,
    conversationId: string,
    currentMemberId: string
}