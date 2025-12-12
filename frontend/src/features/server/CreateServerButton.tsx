// lib
import { Plus } from "lucide-react";
// components
import ActionTooltip from "@/components/ActionTooltip";
// hooks
import { useModal } from "@/hooks/useModal";

const CreateServerButton = () => {
    const { onOpen } = useModal();

    return (
        <ActionTooltip
            label="Create a new server"
            side="right"
            align="center"
        >
            <button
                onClick={() => onOpen("createServer")}
                className="group flex items-center cursor-pointer"
            >
                <div className="flex items-center justify-center size-10 rounded-3xl group-hover:rounded-xl transition-all overflow-hidden bg-background group-hover:bg-blue-600">
                    <Plus className="group-hover:text-white transition text-blue-600" size={25} />
                </div>
            </button>
        </ActionTooltip>
    )
}

export default CreateServerButton;