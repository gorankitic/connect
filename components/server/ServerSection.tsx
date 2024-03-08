"use client";

// hooks
import { useModal } from "@/hooks/useModalStore";
// types
import { ServerWithMembersWithProfiles } from "@/types";
// prisma types
import { ChannelType, MemberRole } from "@prisma/client";
// components
import { ActionTooltip } from "@/components/ActionTooltip";
// assets
import { Plus, Settings } from "lucide-react";

type ServerSectionProps = {
    label: string,
    role?: MemberRole,
    sectionType: "channels" | "members",
    channelType?: ChannelType,
    server?: ServerWithMembersWithProfiles
}

const ServerSection = ({ label, role, sectionType, channelType, server }: ServerSectionProps) => {
    const { onOpen } = useModal();

    return (
        <div className="flex items-center justify-between py-2">
            <p className="text-sm uppercase font-semibold text-neutral-500 dark:text-neutral-400">
                {label}
            </p>
            {role !== MemberRole.GUEST && sectionType === "channels" && (
                <ActionTooltip label="Create channel" side="top">
                    <button onClick={() => onOpen("createChannel", { channelType })} className="text-neutral-500 hover:text-neutral-600 dark:text-neutral-400 dark:hover:text-neutral-300 transition">
                        <Plus className="h-4 w-4" />
                    </button>
                </ActionTooltip>
            )}
            {role === MemberRole.ADMIN && sectionType === "members" && (
                <ActionTooltip label="Manage members" side="top">
                    <button onClick={() => onOpen("members", { server })} className="text-neutral-500 hover:text-neutral-600 dark:text-neutral-400 dark:hover:text-neutral-300 transition">
                        <Settings className="h-4 w-4" />
                    </button>
                </ActionTooltip>
            )}
        </div>
    )
}

export default ServerSection;