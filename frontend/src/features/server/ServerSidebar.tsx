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
import { useChannels } from "@/features/channels/useChannels";
import { useMember } from "@/features/members/useMember";
import { useNotificationsMap } from "@/features/notifications/useNotificationsMap";
import { useNotificationsSocket } from "@/features/notifications/useNotificationsSocket";
import { useSyncDataSocket } from "@/features/chat/useSyncDataSocket";
// constants
import { CHANNEL_TYPE } from "@/lib/constants/channel.constants";
import { MEMBER_ROLE } from "@/lib/constants/member.constants";

const ServerSidebar = () => {
    const { serverId } = useParams<{ serverId: string }>();
    const { server, error } = useServer(serverId);
    const { currentMember } = useMember(serverId);
    const { channels } = useChannels(serverId);
    const { members } = useMembers(serverId);
    const { notificationsMap } = useNotificationsMap(serverId);
    useNotificationsSocket(serverId);
    useSyncDataSocket(serverId);

    if (error) return <ErrorState error={error} />
    if (!serverId || !server || !currentMember) return null;

    const textChannels = channels.filter((channel) => channel.type === CHANNEL_TYPE.TEXT);
    const audioChannels = channels.filter((channel) => channel.type === CHANNEL_TYPE.AUDIO);
    const videoChannels = channels.filter((channel) => channel.type === CHANNEL_TYPE.VIDEO);
    const otherMembers = members.filter((m) => m._id !== currentMember._id);

    return (
        <div className="flex flex-col w-72 lg:w-80 bg-gray-200 border-r border-r-gray-400/50 h-full">
            <ServerHeader serverId={server._id} name={server.name} role={currentMember.role} />
            <ScrollArea className="flex-1 w-full overflow-y-auto">
                <SidebarSection
                    label="Text channels"
                    action={currentMember.role !== MEMBER_ROLE.GUEST && <CreateChannelButton serverId={server._id} channelType={CHANNEL_TYPE.TEXT} />}
                    items={textChannels}
                    renderItem={(channel) =>
                        <ChannelListItem
                            key={channel._id}
                            channel={channel}
                            serverId={server._id}
                            role={currentMember.role}
                        />
                    }
                />
                <SidebarSection
                    label="Audio channels"
                    action={currentMember.role !== MEMBER_ROLE.GUEST && <CreateChannelButton serverId={server._id} channelType={CHANNEL_TYPE.AUDIO} />}
                    items={audioChannels}
                    renderItem={(channel) =>
                        <ChannelListItem
                            key={channel._id}
                            channel={channel}
                            serverId={server._id}
                            role={currentMember.role}
                        />
                    }
                />
                <SidebarSection
                    label="Video channels"
                    action={currentMember.role !== MEMBER_ROLE.GUEST && <CreateChannelButton serverId={server._id} channelType={CHANNEL_TYPE.VIDEO} />}
                    items={videoChannels}
                    renderItem={(channel) =>
                        <ChannelListItem
                            key={channel._id}
                            channel={channel}
                            serverId={server._id}
                            role={currentMember.role}
                        />
                    }
                />
                <SidebarSection
                    label="Server members"
                    action={currentMember.role === MEMBER_ROLE.ADMIN && <ManageMembersButton serverId={server._id} />}
                    items={otherMembers}
                    renderItem={(member) =>
                        <MemberListItem
                            key={member._id}
                            member={member}
                            notificationsMap={notificationsMap}
                        />
                    }
                />
            </ScrollArea>
        </div>
    )
}

export default ServerSidebar;