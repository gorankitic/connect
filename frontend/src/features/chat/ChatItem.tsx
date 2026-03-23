// lib
import { format } from "date-fns";
// types
import type { Message } from "@/lib/types/message.types";
// constants
import { MEMBER_ROLE, MEMBER_ROLE_ICON_MAP } from "@/lib/constants/member.constants";
// components
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import ChatMessageActions from "@/features/chat/ChatMessageActions";
import ChatMessageEditor from "@/features/chat/ChatMessageEditor";
import ActionTooltip from "@/components/ActionTooltip";
// utils
import { cn, getAvatarUrl, getInitials } from "@/lib/utils";
// hooks
import { useActiveMessage } from "@/hooks/useActiveMessage";
import { useGetOrCreateConversation } from "@/features/conversation/useGetOrCreateConversation";
import { useMember } from "@/features/members/useMember";
import { useChat } from "@/hooks/useChat";

type ChatItemProps = {
    message: Message
}

const ChatItem = ({ message }: ChatItemProps) => {
    const serverId = useChat(s => s.serverId);
    const { activeMessage } = useActiveMessage();
    const { getOrCreate } = useGetOrCreateConversation();
    const { currentMember } = useMember(serverId);

    const isUpdating = activeMessage?.id === message._id;

    const Icon = MEMBER_ROLE_ICON_MAP[message.member.role];

    if (!serverId || !currentMember) return null;

    const handleRedirect = () => {
        if (currentMember._id === message.member._id) return;
        getOrCreate({ serverId, memberId: message.member._id });
    }

    return (
        <div className="group text-gray-700 hover:bg-gray-200 py-2 px-3 rounded-sm">
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
                    <button
                        onClick={handleRedirect}
                        className="flex items-center gap-1"
                    >
                        <p className={cn("font-semibold", currentMember._id !== message.member._id && "hover:underline cursor-pointer")}>
                            {message.member.name}
                        </p>
                        <ActionTooltip side="top" label={message.member.role.toLowerCase()}>
                            {Icon && <Icon className={cn("size-4", message.member.role === MEMBER_ROLE.ADMIN ? "text-amber-500" : "text-blue-500")} />}
                        </ActionTooltip>
                    </button>
                    <p className="text-xs text-gray-400">
                        {message.createdAt !== message.updatedAt
                            ? message.deletedAt
                                ? <span>{format(new Date(message.deletedAt), 'd.M.y. HH:mm')} &bull; Deleted</span>
                                : <span>{format(new Date(message.updatedAt), 'd.M.y. HH:mm')} &bull; Updated</span>
                            : format(new Date(message.createdAt), 'd.M.y. HH:mm')
                        }
                    </p>
                </div>
                {!isUpdating &&
                    <ChatMessageActions
                        messageId={message._id}
                        messageAuthorId={message.member._id}
                        messageAuthorRole={message.member.role}
                        isDeleted={!!message.deletedAt}
                    />}
            </div>
            {!isUpdating ? message.deletedAt
                ? <i className="ml-12 font-semibold">This message is deleted.</i>
                : <p className="ml-12 whitespace-pre-wrap wrap-break-word">{message.content}</p>
                : <ChatMessageEditor content={message.content} messageId={message._id} />
            }
        </div >
    )
}

export default ChatItem;