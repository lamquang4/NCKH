import { memo } from "react";
import { LuSendHorizontal } from "react-icons/lu";
import Button from "../../../ui/Button";

type Props = {
  textLength: number;
  isLoadingSendMessage: boolean;
  isLoadingMessages: boolean;
};

function ChatButton({
  textLength,
  isLoadingSendMessage,
  isLoadingMessages,
}: Props) {
  const isDisabled =
    textLength === 0 ||
    textLength > 1000 ||
    isLoadingSendMessage ||
    isLoadingMessages;
  return (
    <Button
      isDisabled={isDisabled}
      className={`w-9 h-9 flex items-center justify-center rounded-full ${
        isDisabled ? "bg-gray-200 text-gray-500" : "bg-primary text-white"
      } `}
    >
      <LuSendHorizontal size={18} />
    </Button>
  );
}

export default memo(ChatButton);
