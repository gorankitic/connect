
// components
import ToggleMobile from "@/components/ToggleMobile";
import UserAvatar from "@/components/UserAvatar";
import { SocketIndicator } from "@/components/SocketIndicator";
// assets
import { Hash } from "lucide-react";

type ChatHeaderProps = {
    serverId: string,
    name: string,
    type: "channel" | "conversation";
    imageUrl?: string
}

const ChatHeader = ({ serverId, name, type, imageUrl }: ChatHeaderProps) => {

    return (
        <div className="text-md font-semibold p-3 flex items-center h-12 border-neutral-200 dark:border-neutral-800 border-b-2">
            <ToggleMobile serverId={serverId} />
            {type === "channel" && <Hash className="w-4 h-4 text-neutral-800 dark:text-neutral-400 mx-2" />}
            {type === "conversation" && <UserAvatar src={imageUrl} className="h-8 w-8 md:h-8 md:w-8 mr-2" />}
            <p className="mr-auto font-semibold text-md text-neutral-800 dark:text-white">
                {name}
            </p>
            <div className="flex items-center">
                <SocketIndicator />
            </div>
        </div>
    )
}

export default ChatHeader;