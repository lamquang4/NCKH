import { memo, useCallback, useEffect, useRef } from "react";
import MessageItem from "./MessageItem";
import useGetChatMessages from "../../../../hooks/customer/chat/useGetChatMessages";

function MessageList() {
  const { messages, isLoading, hasMore, loadMore } = useGetChatMessages();
  const bottomRef = useRef<HTMLDivElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const isFirstLoad = useRef(true);
  const prevScrollHeight = useRef(0);

  // Scroll xuống bottom lần đầu
  useEffect(() => {
    if (isFirstLoad.current && messages.length > 0) {
      bottomRef.current?.scrollIntoView();
      isFirstLoad.current = false;
    }
  }, [messages.length]);

  // Giữ scroll position khi prepend tin nhắn cũ
  useEffect(() => {
    if (!containerRef.current || isFirstLoad.current) return;
    const newScrollHeight = containerRef.current.scrollHeight;
    containerRef.current.scrollTop = newScrollHeight - prevScrollHeight.current;
  }, [messages.length]);

  // Detect kéo lên đầu
  const handleScroll = useCallback(() => {
    if (!containerRef.current) return;
    if (containerRef.current.scrollTop === 0 && hasMore && !isLoading) {
      prevScrollHeight.current = containerRef.current.scrollHeight;
      loadMore();
    }
  }, [hasMore, isLoading, loadMore]);

  return (
    <div
      ref={containerRef}
      onScroll={handleScroll}
      className="flex-1 min-h-0 overflow-y-auto space-y-4 text-[0.9rem] custom-scroll px-3 py-6"
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
