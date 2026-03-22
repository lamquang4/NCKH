import { memo, useCallback, useState } from "react";
import ChatBody from "./chatbody/ChatBody";
import ChatHeader from "./chatheader/ChatHeader";
import ChatFooter from "./chatfooter/ChatFooter";
import type { ChatResponse } from "../../../types/type";
type Props = {
  chat: ChatResponse;
  onClose: () => void;
};

function ChatContainer({ onClose, chat }: Props) {
  const [isExpanded, setIsExpanded] = useState<boolean>(false);

  const toggleExpand = useCallback(() => {
    setIsExpanded((prev) => !prev);
  }, []);

  const safeChat = chat ?? { id: "", messages: [], userId: "" };

  return (
    <div className="fixed inset-0 flex items-center justify-center pointer-events-none z-16">
      <div
        className={`bg-white pointer-events-auto shadow-xl flex flex-col transition-all duration-300 w-full h-full
    ${isExpanded ? "rounded-none" : "md:w-[600px] md:h-[580px] md:rounded-xl"}`}
      >
        <ChatHeader
          onClose={onClose}
          onExpand={toggleExpand}
          isExpanded={isExpanded}
        />
        <ChatBody messages={safeChat.messages} />
        <ChatFooter chatId={safeChat.id} />
      </div>
    </div>
  );
}

export default memo(ChatContainer);
