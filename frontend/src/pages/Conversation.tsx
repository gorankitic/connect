// lib
import { useParams } from "react-router-dom";
// constants
import { MEMBER_ROLE_ICON_MAP } from "@/lib/constants/member.constants";
// components
import ChatHeader from "@/features/chat/ChatHeader";
// hooks
import { useConversation } from "@/features/conversation/useConversation";

const Conversation = () => {
    const { serverId, conversationId } = useParams<{ serverId: string, conversationId: string }>();
    const { conversation } = useConversation(serverId, conversationId);

    if (!serverId || !conversation) return null;

    const Icon = MEMBER_ROLE_ICON_MAP[conversation.otherMember.role];

    return (
        <div className="ml-80 flex flex-col h-full bg-gray-100">
            <ChatHeader
                variant="conversation"
                name={conversation.otherMember.name}
                avatarUuid={conversation.otherMember.avatarUuid}
                role={conversation.otherMember.role}
                Icon={Icon!}
            />
        </div>
    )
}
export default Conversation