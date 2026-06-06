import { memo } from "react";
import Button from "../../../ui/Button";
import { MdContentCopy } from "react-icons/md";

type Props = {
  onCopy: () => void;
};

function MessageAction({ onCopy }: Props) {
  return (
    <div className="flex gap-1 items-center">
      <Button onClick={onCopy} className="text-neutral">
        <MdContentCopy size={16} />
      </Button>
    </div>
  );
}

export default memo(MessageAction);
