// lib
import { useParams } from "react-router-dom";
// constants
import { CHANNEL_TYPE_ICON_MAP } from "@/lib/constants/channel.constants";
// components
import ChatHeader from "@/features/chat/ChatHeader";
// hooks
import { useChannels } from "@/features/channels/useChannels";
import { useServer } from "@/features/server/useServer";

const Channel = () => {
    const { serverId, channelId } = useParams<{ serverId: string, channelId: string }>();
    const { channels } = useChannels(serverId);
    const { server } = useServer(serverId);

    const channel = channels.find((ch) => ch._id === channelId);

    if (!server || !channel) return null;

    const Icon = CHANNEL_TYPE_ICON_MAP[channel.type];

    return (
        <div className="ml-80 flex flex-col h-full bg-gray-100">
            <ChatHeader
                variant="channel"
                name={channel.name}
                Icon={Icon}
            />
        </div>
    )
}

export default Channel;