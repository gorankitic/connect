// lib
import { Edit, Hash, Lock, Mic, Trash, Video } from "lucide-react";
// types
import type { Channel, MemberRole } from "@/lib/api/apiTypes"
// components
import ActionTooltip from "@/components/ActionTooltip";

type ServerChannelProps = {
    channel: Channel;
    role: MemberRole;
}

const iconMap = {
    ["TEXT"]: Hash,
    ["AUDIO"]: Mic,
    ["VIDEO"]: Video,
}

const ServerChannel = ({ channel, role }: ServerChannelProps) => {

    const Icon = iconMap[channel.type];

    return (
        <button className="group text-gray-500 hover:text-gray-600 w-full flex items-center gap-2 py-1.5 px-2 rounded-sm hover:bg-gray-200 cursor-pointer">
            <Icon className="size-4" />
            <p className="font-semibold">{channel.name}</p>
            {channel.name !== "general" && role !== "GUEST" && (
                <div className="flex items-center gap-1 ml-auto">
                    <ActionTooltip label="Edit">
                        <Edit className="size-4 hidden group-hover:block" />
                    </ActionTooltip>
                    <ActionTooltip label="Delete">
                        <Trash className="size-4 hidden group-hover:block" />
                    </ActionTooltip>
                </div>
            )}
            {channel.name === "general" && (
                <Lock className="size-4 ml-auto" />
            )}
        </button>
    )
}

export default ServerChannel;