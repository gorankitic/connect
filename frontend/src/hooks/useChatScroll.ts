// lib
import { useEffect, useRef } from "react";

type UseChatScrollProps = {
    // Ref to scrollable container (messages wrapper)
    containerRef: React.RefObject<HTMLDivElement | null>;
    // Ref to an empty div at the bottom of the messages list, used for auto-scroll to bottom
    bottomRef: React.RefObject<HTMLDivElement | null>;
    // Load older messages (pagination)
    loadMore: () => void;
    // Is there more messages to be loaded
    hasMore: boolean;
    // Whether a pagination request is currently running
    isLoadingMore: boolean;
    // Total number of rendered messages, used to detect when new messages arrive
    messageCount: number;
    // Reset scroll state when scrollKey changes
    scrollKey: string;
}

export const useChatScroll = ({ containerRef, bottomRef, loadMore, hasMore, isLoadingMore, messageCount, scrollKey }: UseChatScrollProps) => {
    // const [hasInitialized, setHasInitialized] = useState(false);
    // Used to auto-scroll to bottom only once on first render
    const hasInitialized = useRef(false);
    // Used to track previous scroll height
    const prevScrollHeight = useRef<number | null>(null);

    // Handle scrolling UP: load older messages when user scrolls to the top
    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        const handleScroll = () => {
            if (container.scrollTop === 0 && hasMore && !isLoadingMore) {
                // Save current scroll height BEFORE loading more messages
                prevScrollHeight.current = container.scrollHeight;
                loadMore();
            }
        }
        container.addEventListener("scroll", handleScroll);

        return () => {
            container.removeEventListener("scroll", handleScroll);
        }
    }, [containerRef, loadMore, hasMore, isLoadingMore]);

    // Handle message changes and initial scroll
    // 1) When older messages are loaded, keep same position
    // 2) When new message arrive (send/socket), auto-scroll down
    useEffect(() => {
        const container = containerRef.current;
        const bottom = bottomRef.current;
        if (!container || !bottom) return;

        // Restore position after loading older messages
        if (prevScrollHeight.current !== null) {
            const diff = container.scrollHeight - prevScrollHeight.current;
            container.scrollTop = diff;
            prevScrollHeight.current = null;
            return;
        }

        if (messageCount === 0) return;

        const distanceFromBottom =
            container.scrollHeight - container.scrollTop - container.clientHeight;

        const shouldAutoScroll =
            !hasInitialized.current || distanceFromBottom < 100;

        if (shouldAutoScroll) {
            requestAnimationFrame(() => {
                bottom.scrollIntoView({ behavior: "auto" });
                hasInitialized.current = true;
            });
        }
    }, [messageCount, scrollKey]);

    // Reset on chat (channels or conversations) change
    useEffect(() => {
        hasInitialized.current = false;
        prevScrollHeight.current = null;
    }, [scrollKey]);
}