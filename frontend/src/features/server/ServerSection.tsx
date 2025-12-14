// lib
import { Plus, Settings } from "lucide-react";
// components
import ActionTooltip from "@/components/ActionTooltip";
// types
import type { ChannelType, MemberRole } from "@/lib/api/apiTypes";

type ServerSectionProps = {
    label: string,
    role?: MemberRole,
    sectionType: "channels" | "members",
    channelType: ChannelType,
}

const ServerSection = ({ label, role, sectionType }: ServerSectionProps) => {
    return (
        <div className="flex items-center justify-between py-2">
            <p className="text-gray-600 font-semibold uppercase text-sm">{label}</p>
            {role !== "GUEST" && sectionType === "channels" && (
                <ActionTooltip label="Create channel" side="right">
                    <button className="text-gray-500 hover:text-gray-600 tansition cursor-pointer">
                        <Plus className="size-5" />
                    </button>
                </ActionTooltip>
            )}
            {role === "ADMIN" && sectionType === "members" && (
                <ActionTooltip label="Manage members" side="top">
                    <button className="text-gray-500 hover:text-gray-600 tansition">
                        <Settings className="size-4" />
                    </button>
                </ActionTooltip>
            )}
        </div>
    )
}

export default ServerSection;