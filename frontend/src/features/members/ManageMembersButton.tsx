// lib
import { Settings } from "lucide-react";
// components
import ActionTooltip from "@/components/ActionTooltip";
// hooks
import { useModal } from "@/hooks/useModal";

const ManageMembersButton = ({ serverId }: { serverId: string }) => {
    const { onOpen } = useModal();

    return (
        <ActionTooltip label="Manage members" side="right">
            <button
                onClick={() => onOpen("manageMembers", { serverId })}
                className="text-gray-600 hover:text-gray-700 transition cursor-pointer"
            >
                <Settings className="size-5" />
            </button>
        </ActionTooltip>
    )
}

export default ManageMembersButton;
