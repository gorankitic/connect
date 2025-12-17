// lib
import { useNavigate, useParams } from "react-router-dom";
// utils
import { cn, getAvatarUrl } from "@/lib/utils";
// components
import ActionTooltip from "@/components/ActionTooltip";

type ServerListItemProps = {
    _id: string
    name: string,
    avatarUuid: string
}

const ServerListItem = ({ _id, name, avatarUuid }: ServerListItemProps) => {
    const { serverId } = useParams();
    const navigate = useNavigate();

    const isActive = serverId === _id;

    const handleClick = () => {
        navigate(`/servers/${_id}`);
    }

    return (
        <button
            onClick={handleClick}
            className="group relative flex items-center cursor-pointer focus:outline-none"
        >
            <div
                className={cn("absolute left-0 bg-gray-700 rounded-r-full transition-all duration-300 w-1",
                    isActive ? "h-9" : "h-2 opacity-80 group-hover:h-5"
                )}
            />
            <ActionTooltip label={name} side="right" align="center">
                <div
                    className={cn("flex mx-4 size-12 shadow-md transition-all duration-300 overflow-hidden",
                        "rounded-3xl group-hover:rounded-xl",
                        isActive && "rounded-xl"
                    )}
                >
                    <img src={getAvatarUrl(avatarUuid)!} />
                </div>
            </ActionTooltip>
        </button>
    )
}

export default ServerListItem;