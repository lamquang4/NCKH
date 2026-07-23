import { memo } from "react";
import Image from "../../../ui/Image";
import Button from "../../../ui/Button";
import { LuX } from "react-icons/lu";
interface Props {
  onClose: () => void;
}

function ChatHeader({ onClose }: Props) {
  return (
    <div className="flex items-center justify-between px-3 py-2.5 border-b border-gray-200">
      <div className="flex items-center gap-2">
        <Image
          src="/assets/troly.png"
          alt="troly"
          className="w-12 h-12 rounded-full"
          loading="eager"
        />
        <h5>Trợ lý AI</h5>
      </div>

      <div className="flex items-center gap-2">
        <Button onClick={onClose}>
          <LuX size={24} />
        </Button>
      </div>
    </div>
  );
}

export default memo(ChatHeader);
