import { memo } from "react";
import { LuSendHorizontal } from "react-icons/lu";

type Props = {
  hasText: boolean;
};

function ChatButton({ hasText }: Props) {
  return (
    <button
      disabled={!hasText}
      className={`w-9 h-9 flex items-center justify-center rounded-full ${
        hasText ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-500"
      } `}
    >
      <LuSendHorizontal size={18} />
    </button>
  );
}

export default memo(ChatButton);
