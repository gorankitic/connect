// lib
import { Navigate, useParams } from "react-router-dom";
// types
import type { Channel } from "@/lib/api/apiTypes";
// hooks
import { useServer } from "@/features/server/useServer";
import Loader from "@/components/Loader";

const ServerIndexRoute = () => {
    const { serverId } = useParams<{ serverId: string }>();
    const { server, isPending } = useServer(serverId);

    if (isPending) {
        return (
            <div className="flex h-full items-center justify-center">
                <Loader className="size-12" />
            </div>
        );
    }

    if (!server) return null;

    const generalChannel = server.channels.find((ch: Channel) => ch.type === "TEXT" && ch.name === "general") ?? server.channels[0];

    return (
        <Navigate
            to={`/servers/${server._id}/channels/${generalChannel._id}`}
            replace
        />
    );
};

export default ServerIndexRoute;
