import { useState } from "react";
import ChatBody from "./ChatBody";
import ChatHeader from "./ChatHeader";
import ChatInput from "./ChatInput";
type Props = {
  onClose: () => void;
};

function ChatContainer({ onClose }: Props) {
  const [isExpanded, setIsExpanded] = useState<boolean>(false);

  const toggleExpand = () => {
    setIsExpanded((prev) => !prev);
  };
  return (
    <div className="h-screen flex justify-center items-center">
      <div
        className={`
          bg-white shadow-xl flex flex-col overflow-hidden z-99
          transition-all duration-300
          ${
            isExpanded
              ? "w-full h-full rounded-none"
              : "w-[600px] h-[580px] rounded-2xl"
          }
        `}
      >
        <ChatHeader
          onClose={onClose}
          onExpand={toggleExpand}
          isExpanded={isExpanded}
        />
        <ChatBody />
        <ChatInput />
      </div>
    </div>
  );
}

export default ChatContainer;
