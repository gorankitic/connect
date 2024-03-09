"use client";

// react
import { Fragment, useRef, ElementRef } from "react";
// hooks
import { useChatQuery } from "@/hooks/useChatQuery";
import { useChatSocket } from "@/hooks/useChatSocket";
// prisma types
import { Member, Message, Profile } from "@prisma/client";
// components
import ChatWelcome from "./ChatWelcome";
import ChatItem from "./ChatItem";
// assets
import { Loader2, ServerCrash } from "lucide-react";
// libs
import { format } from "date-fns";
import { useChatScroll } from "@/hooks/useChatScroll";

const DATE_FORMAT = "d.M.yyyy, HH:mm";

type MessageWithMemberWithProfile = Message & {
    member: Member & {
        profile: Profile
    }
}

type ChatMessagesProps = {
    name: string,
    member: Member,
    chatId: string,
    apiUrl: string,
    socketUrl: string,
    socketQuery: Record<string, string>,
    paramKey: "channelId" | "conversationId",
    paramValue: string,
    type: "channel" | "conversation"
}

const ChatMessages = ({ apiUrl, chatId, member, name, paramKey, paramValue, socketQuery, socketUrl, type }: ChatMessagesProps) => {
    const queryKey = `chat:${chatId}`;
    const addKey = `chat:${chatId}:messages`;
    const updateKey = `chat:${chatId}:messages:update`;

    const chatRef = useRef<ElementRef<"div">>(null);
    const bottomRef = useRef<ElementRef<"div">>(null);

    const { data, fetchNextPage, hasNextPage, isFetchingNextPage, status } = useChatQuery({ queryKey, apiUrl, paramKey, paramValue });
    useChatSocket({ queryKey, addKey, updateKey });
    useChatScroll({ chatRef, bottomRef, loadMore: fetchNextPage, shouldLoadMore: !isFetchingNextPage && !!hasNextPage, count: data?.pages?.[0]?.items?.length ?? 0 });

    if (status === "loading") {
        return (
            <div className="flex flex-col flex-1 justify-center items-center">
                <Loader2 className="h-7 w-7 text-neutral-500 animate-spin my-4" />
                <p className="text-xs text-neutral-500 dark:text-neutral-400">Loading messages...</p>
            </div>
        )
    }
    if (status === "error") {
        return (
            <div className="flex flex-col flex-1 justify-center items-center">
                <ServerCrash className="h-7 w-7 text-neutral-500 my-4" />
                <p className="text-xs text-neutral-500 dark:text-neutral-400">Something went wrong!</p>
            </div>
        )
    }
    return (
        <div ref={chatRef} className="flex-1 flex flex-col  pt-4 pb-2 overflow-y-auto">
            {!hasNextPage && <div className="flex-1" />}
            {!hasNextPage && <ChatWelcome type={type} name={name} />}
            {hasNextPage && (
                <div className="flex justify-center">
                    {isFetchingNextPage ?
                        <Loader2 className="h-6 w-6 text-neutral-500 animate-spin my-4" />
                        :
                        <button
                            onClick={() => fetchNextPage()}
                            className="text-neutral-500 hover:text-neutral-600 dark:text-neutral-400 text-xs my-4 dark:hover:text-neutral-300 transition"
                        >
                            Load previous messages
                        </button>
                    }
                </div>
            )}
            <div className="flex flex-col-reverse mt-auto">
                {data?.pages?.map((group, i) => (
                    <Fragment key={i}>
                        {group.items.map((message: MessageWithMemberWithProfile) => (
                            <ChatItem
                                key={message.id}
                                id={message.id}
                                currentMember={member}
                                member={message.member}
                                content={message.content}
                                fileUrl={message.fileUrl}
                                deleted={message.deleted}
                                timestamp={format(new Date(message.createdAt), DATE_FORMAT)}
                                isUpdated={message.updatedAt !== message.createdAt}
                                socketUrl={socketUrl}
                                socketQuery={socketQuery}
                            />
                        ))}
                    </Fragment>
                ))}
            </div>
            <div ref={bottomRef} />
        </div>
    )
}

export default ChatMessages;