// lib
import { useInfiniteQuery, type InfiniteData } from "@tanstack/react-query";
// types
import type { ChatMessagesProps } from "@/lib/types/chat.types";
import type { MessagesPage, NormalizedError } from "@/lib/api/apiTypes";
// services
import { getChannelMessagesApi, getConversationMessagesApi } from "@/services/message.services";

export const useMessages = ({ type, serverId, targetId }: ChatMessagesProps) => {
    const { data, isLoading, error, fetchNextPage, hasNextPage, isFetchingNextPage } = useInfiniteQuery<
        MessagesPage,                                       // TQueryFnData
        NormalizedError,                                    // TError
        InfiniteData<MessagesPage>,                         // TData
        [string, string | undefined, string | undefined],   // TQueryKey
        string | null                                       // TPageParam   
    >({
        queryKey: [`${type}-messages`, serverId, targetId],
        queryFn: ({ pageParam }) => {
            if (type === "channel") {
                return getChannelMessagesApi({
                    serverId: serverId!,
                    channelId: targetId!,
                    cursor: pageParam ?? null,
                    limit: 15,
                });
            }
            return getConversationMessagesApi({
                serverId: serverId!,
                conversationId: targetId!,
                cursor: pageParam ?? null,
                limit: 15,
            });
        },
        enabled: !!serverId && !!targetId,
        initialPageParam: null as string | null,
        getNextPageParam: (lastPage) => { return lastPage.nextCursor },
        staleTime: Infinity,
        retry: false
    });

    return {
        messages: data?.pages.flatMap((page) => page.messages).reverse() ?? [],
        isLoading,
        error,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage
    }
}