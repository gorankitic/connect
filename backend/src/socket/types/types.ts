export type ChannelJoinPayload = {
    serverId: string;
    channelId: string;
};

export type ConversationJoinPayload = {
    serverId: string;
    conversationId: string;
    currentMemberId: string;
};