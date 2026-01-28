// lib
import { useNavigate, useParams } from "react-router-dom";
import { Edit, Lock, Trash } from "lucide-react";
// utils
import { cn } from "@/lib/utils";
// types
import type { Channel } from "@/lib/types/channel.types";
import type { MemberRole } from "@/lib/types/member.types";
// constants
import { MEMBER_ROLE } from "@/lib/constants/member.constants";
import { CHANNEL_TYPE_ICON_MAP } from "@/lib/constants/channel.constants";
// components
import ActionTooltip from "@/components/ActionTooltip";
// hooks
import { useModal } from "@/hooks/useModal";

type ChannelListItemProps = {
    channel: Channel;
    serverId: string,
    role: MemberRole;
}

const ChannelListItem = ({ channel, role, serverId }: ChannelListItemProps) => {
    const navigate = useNavigate();
    const { channelId } = useParams<{ serverId: string, channelId: string }>();
    const { onOpen } = useModal();

    const Icon = CHANNEL_TYPE_ICON_MAP[channel.type];
    const isActive = channelId === channel._id;

    return (
        <div
            onClick={() => navigate(`/servers/${serverId}/channels/${channel._id}`)}
            className={cn("group text-gray-500 hover:text-gray-600 w-full flex items-center gap-2 py-2 px-3 rounded-sm hover:bg-gray-300 cursor-pointer",
                isActive && "bg-gray-300 text-gray-600"
            )}
        >
            <Icon className="size-4" />
            <p className="font-semibold">{channel.name}</p>
            {channel.name !== "general" && role !== MEMBER_ROLE.GUEST && (
                <div className="flex items-center gap-1 ml-auto">
                    <ActionTooltip label="Update">
                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                onOpen("updateChannel", { serverId, channelId: channel._id });
                            }}
                        >
                            <Edit className="size-4 hidden group-hover:block hover:text-gray-700 cursor-pointer transition" />
                        </button>
                    </ActionTooltip>
                    <ActionTooltip label="Delete">
                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                onOpen("deleteChannel", { serverId, channelId: channel._id });
                            }}
                        >
                            <Trash className="size-4 hidden group-hover:block hover:text-red-500 cursor-pointer transition" />
                        </button>
                    </ActionTooltip>
                </div>
            )}
            {channel.name === "general" && (
                <Lock className="size-4 ml-auto" />
            )}
        </div>
    )
}

export default ChannelListItem;