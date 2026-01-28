// lib
import { useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";
// constants
import { CHAT_TYPE } from "@/lib/constants/chat.contants";
import { MEMBER_ROLE_ICON_MAP } from "@/lib/constants/member.constants";
// components
import ChatHeader from "@/features/chat/ChatHeader";
import ChatMessages from "@/features/chat/ChatMessages";
import ChatInput from "@/features/chat/ChatInput";
import MediaRoom from "@/components/MediaRoom";
// hooks
import { useServer } from "@/features/server/useServer";
import { useConversation } from "@/features/conversation/useConversation";
import { useChatSocket } from "@/features/chat/useChatSocket";
import { useChat } from "@/hooks/useChat";

const Conversation = () => {
    const location = useLocation();
    const { serverId, conversationId } = useParams<{ serverId: string, conversationId: string }>();
    const { server } = useServer(serverId);
    const { conversation } = useConversation(serverId, conversationId);
    const { enterChat, leaveChat } = useChat();
    useChatSocket({ serverId, targetId: conversationId, type: CHAT_TYPE.CONVERSATION });

    useEffect(() => {
        if (!serverId || !conversationId) return;
        enterChat({ type: CHAT_TYPE.CONVERSATION, serverId, targetId: conversationId });
        return () => leaveChat();
    }, [serverId, conversationId]);

    if (!server || !conversation || !serverId || !conversationId) return null;

    const searchParams = new URLSearchParams(location.search);
    const callType = searchParams.get("call");
    const Icon = MEMBER_ROLE_ICON_MAP[conversation.otherMember.role];

    return (
        <div className="ml-80 flex flex-col h-screen bg-gray-100">
            <ChatHeader
                type={CHAT_TYPE.CONVERSATION}
                name={conversation.otherMember.name}
                avatarUuid={conversation.otherMember.avatarUuid}
                role={conversation.otherMember.role}
                Icon={Icon!}
            />
            {!callType && (
                <>
                    <ChatMessages name={conversation.otherMember.name} scrollKey={conversationId} />
                    <ChatInput name={conversation.otherMember.name} />
                </>
            )}
            {callType === "video" && <MediaRoom video={true} audio={true} />}
        </div>
    )
}

export default Conversation;