import { useState } from "react";
import { LuSendHorizontal } from "react-icons/lu";
function ChatInput() {
  const [message, setMessage] = useState<string>("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(e.target.value);
  };

  return (
    <div className="border-t border-gray-200 px-3 py-2.5">
      <div className="flex items-center gap-2 p-1 border border-gray-300 rounded-full group focus-within:border-blue-500">
        <input
          type="text"
          name="message"
          value={message}
          placeholder="Nhập nội dung..."
          onChange={handleChange}
          className="flex-1 px-4 py-0 border-0 text-[0.9rem] outline-0"
        />
        <button
          disabled={message.length === 0}
          className={`w-9 h-9 flex items-center justify-center rounded-full ${
            message.length > 0
              ? "bg-blue-500 text-white"
              : "bg-[#F2F2F2] text-gray-400"
          } `}
        >
          <LuSendHorizontal size={18} />
        </button>
      </div>
    </div>
  );
}

export default ChatInput;
