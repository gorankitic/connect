// lib
import { useRef } from "react";
import { LoaderCircle } from "lucide-react";
// types
import type { Message } from "@/lib/types/message.types";
import type { ChatVariant } from "@/lib/types/chat.types";
import type { NormalizedError } from "@/lib/api/apiTypes";
// components
import ChatWelcome from "@/features/chat/ChatWelcome";
import ChatItem from "@/features/chat/ChatItem";
import ErrorState from "@/components/ErrorState";
// hooks
import { useChatScroll } from "@/hooks/useChatScroll";

type ChatMessagesProps = {
    variant: ChatVariant,
    name: string,
    messages: Message[],
    hasNextPage: boolean,
    fetchNextPage: () => void,
    isFetchingNextPage: boolean,
    scrollKey: string,
    isLoading: boolean,
    error: NormalizedError | null,
}

const ChatMessages = ({ messages, variant, name, hasNextPage, fetchNextPage, isFetchingNextPage, scrollKey, isLoading, error }: ChatMessagesProps) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const bottomRef = useRef<HTMLDivElement>(null);

    useChatScroll({
        containerRef,
        bottomRef,
        hasMore: !!hasNextPage,
        loadMore: fetchNextPage,
        isLoadingMore: isFetchingNextPage,
        messageCount: messages.length,
        scrollKey
    });

    if (isLoading) {
        return (
            <div className="flex flex-col flex-1 justify-center items-center">
                <LoaderCircle className='size-7 animate-spin text-gray-700 my-4' />
                <span className="text-gray-600 text-xs">Loading messages...</span>
            </div>

        )
    }

    if (error) return <ErrorState error={error} />

    return (
        <div
            ref={containerRef}
            className="flex-1 overflow-y-auto px-40 pb-4"
        >
            <div className="min-h-full flex flex-col justify-end">
                {!hasNextPage && <ChatWelcome variant={variant} name={name} />}

                {hasNextPage && (
                    <div className="flex justify-center py-4">
                        {isFetchingNextPage ? (
                            <div className="flex flex-col items-center">
                                <LoaderCircle className='size-6 animate-spin text-gray-700' />
                                <span className="text-gray-600 text-xs">Loading older messages...</span>
                            </div>
                        ) : (
                            <button
                                onClick={fetchNextPage}
                                className="text-xs text-gray-500 hover:text-gray-700 cursor-pointer"
                            >
                                Load previous messages
                            </button>
                        )}
                    </div>
                )}

                {messages.map((message) => (
                    <ChatItem key={message._id} message={message} />
                ))}
            </div>

            <div ref={bottomRef} />
        </div>
    )
}

export default ChatMessages;