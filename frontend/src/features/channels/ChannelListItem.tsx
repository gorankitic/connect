// lib
import { Edit, Lock, Trash } from "lucide-react";
// types & constants
import type { Channel } from "@/lib/api/apiTypes";
import type { MemberRole } from "@/lib/constants/member.constants";
import { CHANNEL_TYPE_ICON_MAP } from "@/lib/constants/channel.constants";
// components
import ActionTooltip from "@/components/ActionTooltip";
// hooks
import { useModal } from "@/hooks/useModal";
import { useNavigate } from "react-router-dom";

type ChannelListItemProps = {
    channel: Channel;
    serverId: string,
    role: MemberRole;
}

const ChannelListItem = ({ channel, role, serverId }: ChannelListItemProps) => {
    const navigate = useNavigate();
    const { onOpen } = useModal();

    const Icon = CHANNEL_TYPE_ICON_MAP[channel.type];

    return (
        <div
            onClick={() => navigate(`/servers/${serverId}/channels/${channel._id}`)}
            className="group text-gray-500 hover:text-gray-600 w-full flex items-center gap-2 py-2 px-3 rounded-sm hover:bg-gray-200 cursor-pointer"
        >
            <Icon className="size-4" />
            <p className="font-semibold">{channel.name}</p>
            {channel.name !== "general" && role !== "GUEST" && (
                <div className="flex items-center gap-1 ml-auto">
                    <ActionTooltip label="Update">
                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                onOpen("updateChannel", { serverId, channelId: channel._id });
                            }}
                        >
                            <Edit className="size-4 hidden group-hover:block cursor-pointer" />
                        </button>
                    </ActionTooltip>
                    <ActionTooltip label="Delete">
                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                onOpen("deleteChannel", { serverId, channelId: channel._id });
                            }}
                        >
                            <Trash className="size-4 hidden group-hover:block hover:text-red-500 cursor-pointer" />
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