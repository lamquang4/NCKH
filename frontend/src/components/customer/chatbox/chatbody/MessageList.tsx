import { memo, useEffect, useRef } from "react";
import MessageItem from "./MessageItem";
import type { MessageResponse } from "../../../../types/type";

type Props = {
  messages?: MessageResponse[];
};

const welcomeMessage: MessageResponse = {
  id: "welcome-message",
  chatId: "",
  role: "ASSISTANT",
  content: "Xin chào! Mình là trợ lý AI của bạn. Bạn cần mình giúp gì hôm nay?",
  createdAt: new Date().toISOString(),
};

function MessageList({ messages = [] }: Props) {
  const bottomRef = useRef<HTMLDivElement | null>(null);

  const displayMessages =
    messages.length === 0 ? [welcomeMessage] : [welcomeMessage, ...messages];

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [displayMessages.length]);

  return (
    <div className="flex-1 min-h-0 overflow-y-auto space-y-4 text-[0.9rem] custom-scroll px-3 py-6">
      {displayMessages.map((msg) => (
        <MessageItem
          key={msg.id}
          type={msg.role === "ASSISTANT" ? "ASSISTANT" : "USER"}
          text={msg.content}
          products={msg.products}
        />
      ))}

      <div ref={bottomRef} />
    </div>
  );
}

export default memo(MessageList);
