"use client";

// hooks
import { useRouter, useParams } from "next/navigation";
import { ModalType, useModal } from "@/hooks/useModalStore";
// prisma types
import { Channel, ChannelType, MemberRole, Server } from "@prisma/client";
// assets
import { Edit, Hash, Lock, Mic, Trash, Video } from "lucide-react";
// utils
import { cn } from "@/lib/utils";
// components
import { ActionTooltip } from "@/components/ActionTooltip";

type ServerChannelProps = {
    channel: Channel,
    server: Server,
    role?: MemberRole
}

const iconMap = {
    [ChannelType.TEXT]: Hash,
    [ChannelType.AUDIO]: Mic,
    [ChannelType.VIDEO]: Video
}

const ServerChannel = ({ channel, server, role }: ServerChannelProps) => {
    const params = useParams();
    const router = useRouter();
    const { onOpen } = useModal();

    const Icon = iconMap[channel.type];

    const handleClick = () => {
        router.push(`/servers/${params?.serverId}/channels/${channel.id}`);
    }

    const onAction = (e: React.MouseEvent, action: ModalType) => {
        e.stopPropagation();
        onOpen(action, { channel, server });
    }

    return (
        <button
            onClick={handleClick}
            className={cn(
                "group px-2 py-2 rounded-md flex items-center gap-x-2 w-full hover:bg-neutral-700/10 dark:hover:bg-neutral-700/50 transition mb-1",
                params?.channelId === channel.id && "bg-neutral-700/20 dark:bg-neutral-700"
            )}
        >
            <Icon className="flex-shrink-0 w-5 h-5 text-neutral-500 dark:text-neutral-400" />
            <p className={cn(
                "line-clamp-1 font-semibold text-sm text-neutral-500 group-hover:text-neutral-600 dark:text-neutral-400 dark:group-hover:text-neutral-300 transition",
                params?.channelId === channel.id && "text-primary dark:text-neutral-200 dark:group-hover:text-white"
            )}>
                {channel.name}
            </p>
            {channel.name !== "general" && role !== MemberRole.GUEST && (
                <div className="ml-auto flex items-center gap-x-2">
                    <ActionTooltip label="Edit">
                        <Edit 
                            onClick={(e) => onAction(e, "editChannel")}
                            className="h-4 w-4 hidden group-hover:block text-neutral-500 hover:text-neutral-600 dark:text-neutral-400 dark:hover:text-neutral-300 transition"
                        />
                    </ActionTooltip>
                    <ActionTooltip label="Delete">
                        <Trash 
                            onClick={(e) => onAction(e, "deleteChannel")}
                            className="h-4 w-4 hidden group-hover:block text-neutral-500 hover:text-neutral-600 dark:text-neutral-400 dark:hover:text-neutral-300 transition" 
                        />
                    </ActionTooltip>
                </div>
            )}
            {channel.name === "general" && (
                <Lock className="ml-auto w-4 h-4 text-neutral-500 dark:text-neutral-400" /> 
            )}
        </button>
    )
}

export default ServerChannel;