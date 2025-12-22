import ChatBody from "./ChatBody";
import ChatHeader from "./ChatHeader";
import ChatInput from "./ChatInput";
type Props = {
  onClose: () => void;
};

function ChatContainer({ onClose }: Props) {
  return (
    <div className="h-screen flex justify-center items-center">
      <div className="w-[600px] h-[550px] bg-white rounded-xl shadow-xl flex flex-col overflow-hidden z-50">
        <ChatHeader onClose={onClose} />
        <ChatBody />
        <ChatInput />
      </div>
    </div>
  );
}

export default ChatContainer;
