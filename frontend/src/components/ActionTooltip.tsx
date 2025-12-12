// components
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

type ActionTooltipProps = {
    label: string,
    children: React.ReactNode,
    side?: "top" | "right" | "bottom" | "left",
    align?: "start" | "center" | "end"
}

const ActionTooltip = ({ label, children, side, align }: ActionTooltipProps) => {

    return (
        <TooltipProvider>
            <Tooltip delayDuration={50}>
                <TooltipTrigger asChild>
                    {children}
                </TooltipTrigger>
                <TooltipContent side={side} align={align} className="bg-gray-200 text-gray-700 shadow-md">
                    <p className="text-xs capitalize">{label}</p>
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    )
}

export default ActionTooltip;