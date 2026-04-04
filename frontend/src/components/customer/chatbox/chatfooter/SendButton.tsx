import { memo } from "react";
import { LuSendHorizontal } from "react-icons/lu";
import Button from "../../../ui/Button";

type Props = {
  textLength: number;
  isLoading: boolean;
};

function ChatButton({ textLength, isLoading }: Props) {
  const isDisabled = textLength === 0 || textLength > 1000 || isLoading;
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
