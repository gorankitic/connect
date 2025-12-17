// lib
import { Plus } from "lucide-react";
// components
import ActionTooltip from "@/components/ActionTooltip";
// hooks
import { useModal } from "@/hooks/useModal";
// types & constants
import type { ChannelType } from "@/lib/constants/channel.constants";

type CreateChannelButtonProps = {
    serverId: string,
    channelType: ChannelType
}

const CreateChannelButton = ({ serverId, channelType }: CreateChannelButtonProps) => {
    const { onOpen } = useModal();

    return (
        <ActionTooltip label="Create channel" side="right">
            <button
                onClick={() => onOpen("createChannel", { serverId, channelType })}
                className="text-gray-500 hover:text-gray-600 transition cursor-pointer"
            >
                <Plus className="size-5" />
            </button>
        </ActionTooltip>
    )
}

export default CreateChannelButton;