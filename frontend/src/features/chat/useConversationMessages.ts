// lib
import { useInfiniteQuery, type InfiniteData } from "@tanstack/react-query"
// services
import { getConversationMessagesApi } from "@/services/message.services";
// types
import type { ChannelMessagesPage, NormalizedError } from "@/lib/api/apiTypes";

export const useConversationMessages = ({ serverId, conversationId }: { serverId?: string, conversationId?: string }) => {

    const { data, isLoading, error, fetchNextPage, hasNextPage, isFetchingNextPage } = useInfiniteQuery
        <ChannelMessagesPage, NormalizedError, InfiniteData<ChannelMessagesPage>, [string, string | undefined, string | undefined], string | null>({
            queryKey: ["conversation-messages", serverId, conversationId],
            queryFn: ({ pageParam }) => getConversationMessagesApi({
                serverId: serverId!,
                conversationId: conversationId!,
                limit: 15,
                cursor: pageParam ?? null
            }),
            enabled: !!serverId && !!conversationId,
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