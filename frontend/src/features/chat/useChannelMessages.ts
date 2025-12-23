// lib
import { useInfiniteQuery, type InfiniteData } from "@tanstack/react-query"
// services
import { getChannelMessagesApi } from "@/services/message.services";
// types
import type { ChannelMessagesPage, NormalizedError } from "@/lib/api/apiTypes";

export const useChannelMessages = ({ serverId, channelId }: { serverId?: string, channelId?: string }) => {

    const { data, isLoading, error, fetchNextPage, hasNextPage, isFetchingNextPage } = useInfiniteQuery
        <ChannelMessagesPage, NormalizedError, InfiniteData<ChannelMessagesPage>, [string, string | undefined, string | undefined], string | null>({
            queryKey: ["channel-messages", serverId, channelId],
            queryFn: ({ pageParam }) => getChannelMessagesApi({
                serverId: serverId!,
                channelId: channelId!,
                limit: 15,
                cursor: pageParam ?? null
            }),
            enabled: !!serverId && !!channelId,
            initialPageParam: null as string | null,
            getNextPageParam: (lastPage) => { return lastPage.nextCursor },
            staleTime: Infinity,
            retry: false
        });

    return {
        messages: data?.pages.flatMap((page) => page.messages).slice().reverse() ?? [],
        isLoading,
        error,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage
    }
}