// lib
import { useParams } from "react-router-dom";
// hooks
import { useServer } from "@/features/server/useServer";
// components
import ErrorState from "@/components/ErrorState";

const ServerSidebar = () => {
    const { serverId } = useParams();
    const { server, error } = useServer(serverId);

    if (error) return <ErrorState error={error} />
    if (!server) return null;

    return (
        <div className="w-72 bg-gray-100 border border-r-gray-300 h-full">
            {server.name}
        </div>
    )
}

export default ServerSidebar;