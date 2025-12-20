// lib
import { Navigate, useParams } from "react-router-dom";
// types
import type { Channel } from "@/lib/types/channel.types";
// components
import Loader from "@/components/Loader";
// hooks
import { useServer } from "@/features/server/useServer";
import { useChannels } from "@/features/channels/useChannels";

const ServerIndexRoute = () => {
    const { serverId } = useParams<{ serverId: string }>();
    const { server, isPending: isPendingServer } = useServer(serverId);
    const { channels, isPending: isPendingChannels } = useChannels(serverId);

    if (isPendingServer || isPendingChannels) {
        return (
            <div className="flex h-full items-center justify-center">
                <Loader className="size-12" />
            </div>
        );
    }

    if (!server || !channels.length) return null;

    const generalChannel = channels.find((ch: Channel) => ch.type === "TEXT" && ch.name === "general") ?? channels[0];

    return (
        <Navigate
            to={`/servers/${server._id}/channels/${generalChannel._id}`}
            replace
        />
    );
};

export default ServerIndexRoute;
