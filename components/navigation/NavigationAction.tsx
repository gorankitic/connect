"use client";

// hooks
import { useModal } from "@/hooks/useModalStore";
// components
import { ActionTooltip } from "@/components/ActionTooltip";
// assets
import { Plus } from "lucide-react";

const NavigationAction = () => {
    const { onOpen } = useModal();

    return (
        <div>
            <ActionTooltip side="right" align="center" label="Create a server">
                <button className="group flex items-center" onClick={() => onOpen("createServer")}>
                    <div className="flex mx-3 h-[48px] w-[48px] rounded-[24px] group-hover:rounded-[16px] transition-all overflow-hidden items-center justify-center bg-background dark:bg-neutral-600 group-hover:bg-sky-500">
                        <Plus className="group-hover:text-white transition text-sky-400" size={25} />
                    </div>
                </button>
            </ActionTooltip>
        </div>
    )
}

export default NavigationAction;