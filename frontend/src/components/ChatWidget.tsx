import { useCallback, useState } from "react";
import Image from "./Image";
import ChatContainer from "./chatbox/ChatContainer";
import Overplay from "./Overplay";

function ChatWidget() {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const toggleChat = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, []);

  return (
    <>
      {isOpen && <ChatContainer onClose={toggleChat} />}

      <div className="fixed bottom-6 right-6 z-98">
        <button
          onClick={toggleChat}
          className="w-14 h-14 rounded-full shadow-lg bg-blue-500 flex items-center justify-center"
        >
          <Image
            source="/assets/chat-box.png"
            alt="chat"
            className="w-7 h-7"
            loading="eager"
          />
        </button>
      </div>

      {isOpen && <Overplay onClose={toggleChat} IndexForZ={40} />}
    </>
  );
}

export default ChatWidget;
