// hooks
import { useServers } from "@/features/server/useServers";
// components
import ServerItem from "@/features/server/ServerItem";

const ServersList = () => {
    const { servers } = useServers();

    return (
        <div className="space-y-2">
            {servers.map((server) => (
                <ServerItem
                    key={server._id}
                    _id={server._id}
                    name={server.name}
                    avatarUuid={server.avatarUuid}
                />
            ))}
        </div>
    )
}

export default ServersList;