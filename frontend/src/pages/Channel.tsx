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
import MediaRoom from "@/components/MediaRoom";
// hooks
import { useServer } from "@/features/server/useServer";
import { useChannels } from "@/features/channels/useChannels";
import { useMessages } from "@/features/chat/useMessages";
import { useCreateMessage } from "@/features/chat/useCreateMessage";
import { useChatSocket } from "@/features/chat/useChatSocket";

const Channel = () => {
    const { serverId, channelId } = useParams<{ serverId: string, channelId: string }>();
    const { server } = useServer(serverId);
    const { channels } = useChannels(serverId);
    const { createMessage, isPending } = useCreateMessage({ type: "channel", serverId, targetId: channelId });
    const { messages, hasNextPage, fetchNextPage, isFetchingNextPage, error, isLoading } = useMessages({ type: "channel", serverId, targetId: channelId });
    useChatSocket({ serverId, targetId: channelId, type: "channel" });

    const channel = channels.find((ch) => ch._id === channelId);

    if (!server || !channel || !serverId || !channelId) return null;

    const Icon = CHANNEL_TYPE_ICON_MAP[channel.type];

    const handleSend = ({ content }: UpsertMessageSchema) => {
        if (!content.trim()) return;
        createMessage({ content });
    }

    return (
        <div className="ml-80 flex flex-col h-screen bg-gray-100">
            <ChatHeader
                variant="channel"
                name={channel.name}
                Icon={Icon}
            />
            {channel.type === "TEXT" && (
                <>
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
                </>
            )}
            {channel.type === "VIDEO" && (
                <MediaRoom
                    callType="channel"
                    serverId={serverId}
                    targetId={channelId}
                    audio={true}
                    video={true}
                />
            )}
            {channel.type === "AUDIO" && (
                <MediaRoom
                    callType="channel"
                    serverId={serverId}
                    targetId={channelId}
                    audio={true}
                    video={false}
                />
            )}
        </div>
    )
}

export default Channel;