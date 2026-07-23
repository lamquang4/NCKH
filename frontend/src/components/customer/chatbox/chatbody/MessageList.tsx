import { memo, useCallback, useLayoutEffect, useRef } from "react";
import MessageItem from "./MessageItem";
import type { MessageResponse } from "../../../../types/type";

interface Props {
  messages: MessageResponse[];
  isLoading: boolean;
  hasMore: boolean;
  loadMore: () => void;
}

function MessageList({ messages, isLoading, hasMore, loadMore }: Props) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const bottomRef = useRef<HTMLDivElement | null>(null);
  const isFirstLoad = useRef(true);
  const isLoadingMore = useRef(false);
  const prevScrollHeight = useRef(0);

  useLayoutEffect(() => {
    const container = containerRef.current;
    if (!container || messages.length === 0) return;

    // Lần đầu load
    if (isFirstLoad.current) {
      container.scrollTop = container.scrollHeight;
      isFirstLoad.current = false;
      return;
    }

    // Load thêm tin cũ
    if (isLoadingMore.current) {
      container.scrollTop = container.scrollHeight - prevScrollHeight.current;
      isLoadingMore.current = false;
      return;
    }

    // Tin nhắn mới → scroll xuống cuối
    container.scrollTop = container.scrollHeight;
  }, [messages.length]);

  const handleScroll = useCallback(() => {
    const container = containerRef.current;
    if (!container || !hasMore || isLoading) return;

    if (container.scrollTop === 0 && !isLoadingMore.current) {
      prevScrollHeight.current = container.scrollHeight;
      isLoadingMore.current = true;
      loadMore();
    }
  }, [hasMore, isLoading, loadMore]);

  return (
    <div
      ref={containerRef}
      onScroll={handleScroll}
      className="flex-1 min-h-0 w-full space-y-4 text-[0.9rem] px-3 py-6 overflow-y-auto overflow-x-hidden custom-scroll"
    >
      {messages.map((msg) => (
        <MessageItem
          key={msg.id}
          role={msg.role === "ASSISTANT" ? "ASSISTANT" : "USER"}
          content={msg.content}
          products={msg.products}
        />
      ))}
      <div ref={bottomRef} />
    </div>
  );
}
export default memo(MessageList);
