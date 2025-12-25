// lib
import { useParams } from "react-router-dom";
// constants
import { MEMBER_ROLE_ICON_MAP } from "@/lib/constants/member.constants";
// schemas & types
import type { UpsertMessageSchema } from "@/lib/schemas/message.schema";
// components
import ChatHeader from "@/features/chat/ChatHeader";
import ChatMessages from "@/features/chat/ChatMessages";
import ChatInput from "@/features/chat/ChatInput";
// hooks
import { useServer } from "@/features/server/useServer";
import { useConversation } from "@/features/conversation/useConversation";
import { useCreateConversationMessage } from "@/features/chat/useCreateConversationMessage";
import { useConversationMessages } from "@/features/chat/useConversationMessages";

const Conversation = () => {
    const { serverId, conversationId } = useParams<{ serverId: string, conversationId: string }>();
    const { server } = useServer(serverId);
    const { conversation } = useConversation(serverId, conversationId);
    const { createConversationMessage, isPending } = useCreateConversationMessage();
    const { messages, hasNextPage, fetchNextPage, isFetchingNextPage, error, isLoading } = useConversationMessages({ serverId, conversationId });

    if (!server || !conversation || !serverId || !conversationId) return null;

    const Icon = MEMBER_ROLE_ICON_MAP[conversation.otherMember.role];

    const handleSend = ({ content }: UpsertMessageSchema) => {
        if (!content.trim()) return;
        createConversationMessage({ serverId, conversationId, body: { content } });
    }

    return (
        <div className="ml-80 flex flex-col h-screen bg-gray-100">
            <ChatHeader
                variant="conversation"
                name={conversation.otherMember.name}
                avatarUuid={conversation.otherMember.avatarUuid}
                role={conversation.otherMember.role}
                Icon={Icon!}
            />
            <ChatMessages
                variant="conversation"
                name={conversation.otherMember.name}
                messages={messages}
                hasNextPage={hasNextPage}
                fetchNextPage={fetchNextPage}
                isFetchingNextPage={isFetchingNextPage}
                scrollKey={conversationId}
                isLoading={isLoading}
                error={error}
            />
            <ChatInput
                variant="conversation"
                name={conversation.otherMember.name}
                isPending={isPending}
                onSend={handleSend}
            />
        </div>
    )
}

export default Conversation;