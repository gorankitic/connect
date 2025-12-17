// hooks
import { useServers } from "@/features/server/useServers";
// components
import ServerListItem from "@/features/server/ServerListItem";

const ServersList = () => {
    const { servers } = useServers();

    return (
        <div className="space-y-2">
            {servers.map((server) => (
                <ServerListItem
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