// lib
import { useParams } from "react-router-dom";
// components
import { ScrollArea } from "@/components/ui/scroll-area";
import ErrorState from "@/components/ErrorState";
import SidebarSection from "@/components/SidebarSection";
import ServerHeader from "@/features/server/ServerHeader";
import ChannelListItem from "@/features/channels/ChannelListItem";
import CreateChannelButton from "@/features/channels/CreateChannelButton";
import ManageMembersButton from "@/features/members/ManageMembersButton";
import MemberListItem from "@/features/members/MemberListItem";
// hooks
import { useServer } from "@/features/server/useServer";
import { useMembers } from "@/features/members/useMembers";

const ServerSidebar = () => {
    const { serverId } = useParams();
    const { server, member, error } = useServer(serverId);
    const { members } = useMembers(serverId);

    if (error) return <ErrorState error={error} />
    if (!server || !member) return null;

    const textChannels = server.channels.filter((channel) => channel.type === "TEXT");
    const audioChannels = server.channels.filter((channel) => channel.type === "AUDIO");
    const videoChannels = server.channels.filter((channel) => channel.type === "VIDEO");
    const otherMembers = members.filter((m) => m._id !== member._id);

    return (
        <div className="fixed flex flex-col w-80 bg-gray-100 border border-r-gray-300 h-full">
            <ServerHeader serverId={server._id} name={server.name} role={member.role} />
            <ScrollArea className="flex-1 w-full overflow-y-auto">
                <SidebarSection
                    label="Text channels"
                    action={member.role !== "GUEST" && <CreateChannelButton serverId={server._id} channelType="TEXT" />}
                    items={textChannels}
                    renderItem={(channel) =>
                        <ChannelListItem
                            key={channel._id}
                            channel={channel}
                            serverId={server._id}
                            role={member.role}
                        />
                    }
                />
                <SidebarSection
                    label="Audio channels"
                    action={member.role !== "GUEST" && <CreateChannelButton serverId={server._id} channelType="AUDIO" />}
                    items={audioChannels}
                    renderItem={(channel) =>
                        <ChannelListItem
                            key={channel._id}
                            channel={channel}
                            serverId={server._id}
                            role={member.role}
                        />
                    }
                />
                <SidebarSection
                    label="Video channels"
                    action={member.role !== "GUEST" && <CreateChannelButton serverId={server._id} channelType="VIDEO" />}
                    items={videoChannels}
                    renderItem={(channel) =>
                        <ChannelListItem
                            key={channel._id}
                            channel={channel}
                            serverId={server._id}
                            role={member.role}
                        />
                    }
                />
                <SidebarSection
                    label="Server members"
                    action={member.role === "ADMIN" && <ManageMembersButton serverId={server._id} />}
                    items={otherMembers}
                    renderItem={(member) => <MemberListItem key={member._id} member={member} />}
                />
            </ScrollArea>
        </div>
    )
}

export default ServerSidebar;