// lib
import { useParams } from "react-router-dom";
// hooks
import { useServer } from "@/features/server/useServer";
// components
import ErrorState from "@/components/ErrorState";
import ServerHeader from "@/features/server/ServerHeader";
import ServerSection from "@/features/server/ServerSection";
import ServerChannel from "@/features/server/ServerChannel";

const ServerSidebar = () => {
    const { serverId } = useParams();
    const { server, member, error } = useServer(serverId);

    if (error) return <ErrorState error={error} />
    if (!server || !member) return null;

    const textChannels = server.channels.filter((channel) => channel.type === "TEXT");
    const audioChannels = server.channels.filter((channel) => channel.type === "AUDIO");
    const videoChannels = server.channels.filter((channel) => channel.type === "VIDEO");

    return (
        <div className="w-72 bg-gray-100 border border-r-gray-300 h-full">
            <ServerHeader server={server} memberId={member._id} role={member.role} />
            {textChannels.length > 0 && (
                <div className="mb-2 px-5">
                    <ServerSection
                        label="Text channels"
                        role={member.role}
                        channelType="TEXT"
                        sectionType="channels"
                    />
                    {textChannels.map((channel) => (
                        <ServerChannel key={channel._id} channel={channel} role={member.role} />
                    ))}
                </div>
            )}
            {audioChannels.length > 0 && (
                <div className="mb-2">
                    <ServerSection
                        label="Audio channels"
                        role={member.role}
                        channelType="AUDIO"
                        sectionType="channels"
                    />
                </div>
            )}
            {videoChannels.length > 0 && (
                <div className="mb-2">
                    <ServerSection
                        label="Video channels"
                        role={member.role}
                        channelType="VIDEO"
                        sectionType="channels"
                    />
                </div>
            )}
        </div>
    )
}

export default ServerSidebar;