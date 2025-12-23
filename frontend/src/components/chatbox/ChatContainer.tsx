import { memo, useCallback, useState } from "react";
import ChatBody from "./ChatBody/ChatBody";
import ChatHeader from "./ChatHeader/ChatHeader";
import ChatFooter from "./ChatFooter/ChatFooter";
type Props = {
  onClose: () => void;
};

function ChatContainer({ onClose }: Props) {
  const [isExpanded, setIsExpanded] = useState<boolean>(false);

  const toggleExpand = useCallback(() => {
    setIsExpanded((prev) => !prev);
  }, []);

  return (
    <div className="h-screen flex justify-center items-center">
      <div
        className={`
    bg-white shadow-xl flex flex-col overflow-hidden z-99
    transition-all duration-300
    w-full h-full
    ${isExpanded ? "rounded-none" : "md:w-[600px] md:h-[580px] md:rounded-2xl"}
  `}
      >
        <ChatHeader
          onClose={onClose}
          onExpand={toggleExpand}
          isExpanded={isExpanded}
        />
        <ChatBody />
        <ChatFooter />
      </div>
    </div>
  );
}

export default memo(ChatContainer);
