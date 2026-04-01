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

    // Used to auto-scroll to bottom only once on first render
    const hasInitialized = useRef(false);
    // Force one auto-scroll after chat switch (channel/DM).
    const shouldForceScrollToBottom = useRef(true);
    // Used to track previous scroll height
    const prevScrollHeight = useRef<number | null>(null);
    // Keep track if user is currently near the bottom of the list
    const isNearBottom = useRef(true);

    const scrollToBottom = () => {
        const bottom = bottomRef.current;
        if (!bottom) return;
        bottom.scrollIntoView({ behavior: "auto", block: "end" });
    };

    // Handle scrolling UP: load older messages when user scrolls to the top
    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        const handleScroll = () => {
            const distanceFromBottom = container.scrollHeight - container.scrollTop - container.clientHeight;
            isNearBottom.current = distanceFromBottom < 150;

            // Used a small threshold to avoid exact-zero edge cases.
            if (container.scrollTop <= 10 && hasMore && !isLoadingMore) {
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

        const shouldAutoScroll =
            shouldForceScrollToBottom.current ||
            !hasInitialized.current ||
            isNearBottom.current;

        if (shouldAutoScroll) {
            // Two RAFs make scroll more reliable when layout height changes
            // after render (e.g. multiline text wrapping)
            requestAnimationFrame(() => {
                requestAnimationFrame(() => {
                    scrollToBottom();
                    hasInitialized.current = true;
                    shouldForceScrollToBottom.current = false;
                });
            });
        }
    }, [messageCount, scrollKey]);

    // If message content height changes after render (multiline wrapping, images),
    // keep the view pinned to bottom only when user is already near bottom
    useEffect(() => {
        const bottom = bottomRef.current;
        if (!bottom || typeof ResizeObserver === "undefined") return;

        // Observe the message list wrapper, not the scroll container itself
        const messagesWrapper = bottom.parentElement;
        if (!messagesWrapper) return;

        const observer = new ResizeObserver(() => {
            if (shouldForceScrollToBottom.current || isNearBottom.current) {
                scrollToBottom();
            }
        });

        observer.observe(messagesWrapper);

        return () => {
            observer.disconnect();
        };
    }, [bottomRef, scrollKey]);

    // Reset on chat (channels or conversations) switch
    useEffect(() => {
        const container = containerRef.current;
        const bottom = bottomRef.current;
        if (!container || !bottom) return;

        hasInitialized.current = false;
        shouldForceScrollToBottom.current = true;
        prevScrollHeight.current = null;

        // requestAnimationFrame (rAF) is a browser API
        // Run this function right before the browser paints the next frame
        // The browser rendering pipeline looks like this: JS, style recalculation, layout (measure DOM), paint (draw pixels)
        // requestAnimationFrame(cb) schedules cb after JS finishes and after layout is known, but before paint
        // That means: scrollHeight, clientHeight, and other DOM sizes are now accurate
        // One requestAnimationFrame = “after JS, before paint”
        // Two requestAnimationFrames = “after paint”
        // Scroll needs: correct layout, painted DOM, correct scrollHeight
        requestAnimationFrame(() => {
            requestAnimationFrame(() => {
                scrollToBottom();
            });
        });
    }, [scrollKey]);
}