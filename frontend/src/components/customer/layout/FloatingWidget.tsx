import { useCallback, useEffect, useState } from "react";
import Image from "../../ui/Image";
import Button from "../../ui/Button";
import ChatWindow from "../chatbox/ChatWindow";
import Overplay from "../../ui/Overplay";
function FloatingWidget() {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const toggleChat = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <>
      {isOpen && <ChatWindow onClose={toggleChat} />}

      <div className="fixed bottom-[15px] right-[15px] z-13">
        <Button
          onClick={toggleChat}
          className="w-14 h-14 rounded-full shadow-lg bg-primary flex items-center justify-center"
        >
          <Image
            src="/assets/chat-box.png"
            alt="chat"
            className="w-7 h-7"
            loading="eager"
          />
        </Button>
      </div>

      {isOpen && <Overplay className="z-15" onClose={toggleChat} />}
    </>
  );
}

export default FloatingWidget;
