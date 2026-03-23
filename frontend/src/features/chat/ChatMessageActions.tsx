// lib
import { Edit, Trash } from "lucide-react";
// components
import ActionTooltip from "@/components/ActionTooltip";
// hooks
import { useActiveMessage } from "@/hooks/useActiveMessage";
import { useMember } from "../members/useMember";
import { useChat } from "@/hooks/useChat";
import { useModal } from "@/hooks/useModal";
// utils
import { canDeleteMessage } from "@/lib/utils";
// types
import type { MemberRole } from "@/lib/types/member.types";

type ChatMessageActionsProps = {
    messageId: string;
    isDeleted: boolean;
    messageAuthorRole: MemberRole;
    messageAuthorId: string;
}

const ChatMessageActions = ({ messageId, isDeleted, messageAuthorId, messageAuthorRole }: ChatMessageActionsProps) => {
    const { onOpen } = useModal();
    const serverId = useChat(s => s.serverId);
    const { startUpdating } = useActiveMessage();
    const { currentMember } = useMember(serverId);

    const canUpdate = currentMember?._id === messageAuthorId && !isDeleted;
    const canDelete = !isDeleted && canDeleteMessage({ memberId: currentMember?._id, memberRole: currentMember?.role, messageAuthorId, messageAuthorRole });

    return (
        <div className="flex items-center gap-2 ml-auto text-gray-600">
            {canUpdate && (
                <ActionTooltip label="Update">
                    <button onClick={() => startUpdating(messageId)}>
                        <Edit className="size-4 block md:hidden md:group-hover:block hover:text-gray-700 cursor-pointer transition" />
                    </button>
                </ActionTooltip>
            )}
            {canDelete && (
                <ActionTooltip label="Delete">
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            onOpen("deleteMessage", { messageId });
                        }}
                    >
                        <Trash className="size-4 block md:hidden md:group-hover:block hover:text-red-500 cursor-pointer transition" />
                    </button>
                </ActionTooltip>
            )}
        </div>
    )
}

export default ChatMessageActions;