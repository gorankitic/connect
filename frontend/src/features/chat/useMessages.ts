// lib
import { useInfiniteQuery, type InfiniteData } from "@tanstack/react-query";
// types
import type { ChatStoreData } from "@/lib/types/chat.types";
import type { MessagesPage, NormalizedError } from "@/lib/api/apiTypes";
// constants
import { CHAT_TYPE } from "@/lib/constants/chat.contants";
// services
import { getChannelMessagesApi, getConversationMessagesApi } from "@/services/message.services";

export const useMessages = ({ type, serverId, targetId }: ChatStoreData) => {
    const { data, isLoading, error, fetchNextPage, hasNextPage, isFetchingNextPage } = useInfiniteQuery<
        MessagesPage,                                       // TQueryFnData
        NormalizedError,                                    // TError
        InfiniteData<MessagesPage>,                         // TData
        [string, string | undefined, string | undefined],   // TQueryKey
        string | null                                       // TPageParam   
    >({
        queryKey: [`${type}-messages`, serverId, targetId],
        queryFn: ({ pageParam }) => {
            if (type === CHAT_TYPE.CHANNEL) {
                return getChannelMessagesApi({
                    serverId: serverId!,
                    targetId: targetId!,
                    cursor: pageParam ?? null,
                    limit: 15,
                });
            }
            return getConversationMessagesApi({
                serverId: serverId!,
                targetId: targetId!,
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