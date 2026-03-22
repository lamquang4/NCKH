import { memo, useEffect, useRef } from "react";
import MessageItem from "./MessageItem";
import type { MessageResponse } from "../../../../types/type";

type Props = {
  messages?: MessageResponse[];
};


function MessageList({ messages = [] }: Props) {
  const bottomRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages.length]);

  return (
    <div className="flex-1 min-h-0 overflow-y-auto space-y-4 text-[0.9rem] custom-scroll px-3 py-6">
      {messages.map((msg) => (
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
