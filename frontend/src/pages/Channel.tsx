// lib
import { useParams } from "react-router-dom";
// schemas
import type { UpsertMessageSchema } from "@/lib/schemas/message.schema";
// constants
import { CHANNEL_TYPE_ICON_MAP } from "@/lib/constants/channel.constants";
// components
import ChatHeader from "@/features/chat/ChatHeader";
import ChatMessages from "@/features/chat/ChatMessages";
import ChatInput from "@/features/chat/ChatInput";
// hooks
import { useServer } from "@/features/server/useServer";
import { useChannels } from "@/features/channels/useChannels";
import { useChannelMessages } from "@/features/chat/useChannelMessages";
import { useCreateChannelMessage } from "@/features/chat/useCreateChannelMessage";

const Channel = () => {
    const { serverId, channelId } = useParams<{ serverId: string, channelId: string }>();
    const { server } = useServer(serverId);
    const { channels } = useChannels(serverId);
    const { createChannelMessage, isPending } = useCreateChannelMessage();
    const { messages, hasNextPage, fetchNextPage, isFetchingNextPage, error, isLoading } = useChannelMessages({ serverId, channelId });

    const channel = channels.find((ch) => ch._id === channelId);

    if (!server || !channel || !serverId || !channelId) return null;

    const Icon = CHANNEL_TYPE_ICON_MAP[channel.type];

    const handleSend = ({ content }: UpsertMessageSchema) => {
        if (!content.trim()) return;
        createChannelMessage({ serverId, channelId, body: { content } });
    }

    return (
        <div className="ml-80 flex flex-col h-screen bg-gray-100">
            <ChatHeader
                variant="channel"
                name={channel.name}
                Icon={Icon}
            />
            <ChatMessages
                variant="channel"
                name={channel.name}
                messages={messages}
                hasNextPage={hasNextPage}
                fetchNextPage={fetchNextPage}
                isFetchingNextPage={isFetchingNextPage}
                scrollKey={channelId}
                isLoading={isLoading}
                error={error}
            />
            <ChatInput
                variant="channel"
                name={channel.name}
                isPending={isPending}
                onSend={handleSend}
            />
        </div>
    )
}

export default Channel;