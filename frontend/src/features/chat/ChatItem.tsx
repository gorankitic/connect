// lib
import { format } from "date-fns";
// types
import type { Message } from "@/lib/types/message.types";
// constants
import { MEMBER_ROLE_ICON_MAP } from "@/lib/constants/member.constants";
// components
import ActionTooltip from "@/components/ActionTooltip";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
// utils
import { cn, getAvatarUrl, getInitials } from "@/lib/utils";

type ChatItemProps = {
    message: Message
}

const ChatItem = ({ message }: ChatItemProps) => {

    const Icon = MEMBER_ROLE_ICON_MAP[message.member.role];

    return (
        <div className="text-gray-700 hover:bg-gray-200 py-2 px-3 rounded-sm">
            <div className="flex items-center gap-2 mb-1" >
                <Avatar className="size-10 text-gray-700">
                    {message.member.avatarUuid ? (
                        <img
                            src={getAvatarUrl(message.member.avatarUuid)!}
                            alt={message.member.name}
                            className="rounded-full object-cover size-10"
                        />
                    ) : (
                        <AvatarFallback className="bg-gray-300">
                            {getInitials(message.member.name)}
                        </AvatarFallback>
                    )}
                </Avatar>
                <div className="flex flex-col">
                    <div className="flex items-center gap-1">
                        <p className="font-semibold">{message.member.name}</p>
                        <ActionTooltip side="top" label={message.member.role.toLowerCase()}>
                            {Icon && <Icon className={cn("size-4", message.member.role === "ADMIN" ? "text-amber-500" : "text-blue-500")} />}
                        </ActionTooltip>
                    </div>
                    <p className="text-xs text-gray-400">{format(new Date(message.createdAt), 'd.M.y. HH:mm')}</p>
                </div>
            </div>
            {/* whitespace-pre-wrap: Preserves \n as line breaks, still wraps long lines */}
            {/* wrap-break-word: Prevents long words / URLs from overflowing */}
            <p className="ml-12 whitespace-pre-wrap wrap-break-word">
                {message.content}
            </p>
        </div>
    )
}

export default ChatItem;