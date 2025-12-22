import { useEffect, useRef } from "react";
import MessageItem from "./MessageItem";

function MessageList() {
  const messages: { id: number; type: "user" | "ai"; text: string }[] = [
    {
      id: 1,
      type: "ai",
      text: "Xin chào! Tôi có thể giúp gì cho bạn?",
    },
    {
      id: 2,
      type: "user",
      text: "Tôi cần tìm hiểu về React eweihwihirowjiorhwiohirojwioriwohrowiohrih ợiiorjowjorjworkowkorkowjorwjirjiwikrwiri.",
    },
    {
      id: 3,
      type: "user",
      text: "Tôi cần tìm hiểu về React.",
    },
    {
      id: 4,
      type: "ai",
      text: "React là một thư viện JavaScript dùng để xây dựng UI.",
    },
    {
      id: 5,
      type: "user",
      text: "Bạn có thể giải thích hooks không?",
    },
    {
      id: 6,
      type: "ai",
      text: "Hooks cho phép bạn dùng state và lifecycle trong function component.",
    },
    {
      id: 7,
      type: "ai",
      text: "Hooks cho phép bạn dùng state và lifecycle trong function component.",
    },
    {
      id: 8,
      type: "ai",
      text: "Hooks cho phép bạn dùng state và lifecycle trong function component.",
    },
  ];

  const bottomRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);
  return (
    <div className="flex-1 min-h-0 overflow-y-auto space-y-4 text-[0.9rem] custom-scroll px-3 py-6">
      {messages.map((msg) => (
        <MessageItem key={msg.id} type={msg.type} text={msg.text} />
      ))}

      <div ref={bottomRef} />
    </div>
  );
}

export default MessageList;
