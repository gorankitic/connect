// lib
import { useLocation, useNavigate } from "react-router-dom";
import { Video, VideoOff } from "lucide-react";
// components
import ActionTooltip from "@/components/ActionTooltip";

const ChatVideoButton = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const params = new URLSearchParams(location.search);

    const isVideo = params.get("call") === "video";
    const Icon = isVideo ? VideoOff : Video;
    const tooltipLabel = isVideo ? "End video call" : "Start video call";

    const onClick = () => {
        const newParams = new URLSearchParams(location.search);

        if (isVideo) {
            newParams.delete("call");
        } else {
            newParams.set("call", "video");
        }

        navigate({ pathname: location.pathname, search: newParams.toString() });
    }

    return (
        <ActionTooltip side="bottom" label={tooltipLabel}>
            <button onClick={onClick} className="hover:opacity-75 transition ml-2 cursor-pointer">
                <Icon className="size-6 text-gray-600" />
            </button>
        </ActionTooltip>
    )
}

export default ChatVideoButton;