// lib
import { useEffect } from "react";
import { useParams } from "react-router-dom";
// constants
import { CHAT_TYPE } from "@/lib/constants/chat.contants";
import { CHANNEL_TYPE, CHANNEL_TYPE_ICON_MAP } from "@/lib/constants/channel.constants";
// components
import ChatHeader from "@/features/chat/ChatHeader";
import ChatMessages from "@/features/chat/ChatMessages";
import ChatInput from "@/features/chat/ChatInput";
import MediaRoom from "@/components/MediaRoom";
// hooks
import { useServer } from "@/features/server/useServer";
import { useChannels } from "@/features/channels/useChannels";
import { useChat } from "@/hooks/useChat";
import { useChatSocket } from "@/features/chat/useChatSocket";

const Channel = () => {
    const { serverId, channelId } = useParams<{ serverId: string, channelId: string }>();
    const { server } = useServer(serverId);
    const { channels } = useChannels(serverId);
    const { enterChat, leaveChat } = useChat();
    useChatSocket({ serverId, targetId: channelId, type: CHAT_TYPE.CHANNEL });

    useEffect(() => {
        if (!serverId || !channelId) return;
        enterChat({ type: CHAT_TYPE.CHANNEL, serverId, targetId: channelId });
        return () => leaveChat();
    }, [serverId, channelId]);

    const channel = channels.find((ch) => ch._id === channelId);

    if (!server || !channel || !serverId || !channelId) return null;

    const Icon = CHANNEL_TYPE_ICON_MAP[channel.type];

    return (
        <div className="ml-80 flex flex-col h-screen bg-gray-100">
            <ChatHeader
                type={CHAT_TYPE.CHANNEL}
                name={channel.name}
                Icon={Icon}
            />
            {channel.type === CHANNEL_TYPE.TEXT && (
                <>
                    <ChatMessages name={channel.name} scrollKey={channelId} />
                    <ChatInput name={channel.name} />
                </>
            )}
            {channel.type === CHANNEL_TYPE.VIDEO && <MediaRoom audio={true} video={true} />}
            {channel.type === CHANNEL_TYPE.AUDIO && <MediaRoom audio={true} video={false} />}
        </div>
    )
}

export default Channel;