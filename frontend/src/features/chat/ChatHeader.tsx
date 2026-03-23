// types
import type { ChannelHeaderProps, ConversationHeaderProps } from "@/lib/types/chat.types";
// constants
import { CHAT_TYPE } from "@/lib/constants/chat.contants";
// components
import ToogleSheet from "@/components/ToogleSheet";
import ChatVideoButton from "@/features/chat/ChatVideoButton";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
// utils
import { cn, getAvatarUrl, getInitials } from "@/lib/utils";

type ChatHeaderProps = ChannelHeaderProps | ConversationHeaderProps;

const ChatHeader = (props: ChatHeaderProps) => {

    return (
        <div className="h-12 flex pl-8 py-2 bg-gray-300 text-gray-700 font-semibold border-b border-b-gray-400/50">
            <ToogleSheet />
            {props.type === CHAT_TYPE.CHANNEL && (
                <div className="flex items-center gap-2">
                    <props.Icon className="size-5" />
                    <span>{props.name}</span>
                </div>
            )}
            {props.type === CHAT_TYPE.CONVERSATION && (
                <div className="flex items-center gap-2">
                    <Avatar className="size-8 text-gray-700">
                        {props.avatarUuid ? (
                            <img
                                src={getAvatarUrl(props.avatarUuid)!}
                                alt={props.name}
                                className="rounded-full object-cover size-8"
                            />
                        ) : (
                            <AvatarFallback className="bg-gray-300">
                                {getInitials(props.name)}
                            </AvatarFallback>
                        )}
                    </Avatar>
                    <span>{props.name}</span>
                    {props.Icon && <props.Icon className={cn("size-5", props.role === "ADMIN" ? "text-amber-500" : "text-blue-500")} />}
                    <ChatVideoButton />
                </div>
            )}
        </div>
    )
}

export default ChatHeader;