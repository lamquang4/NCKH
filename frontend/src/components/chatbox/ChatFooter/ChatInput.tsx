import { forwardRef, memo } from "react";

type Props = {
  onInput: () => void;
};

const ChatInput = forwardRef<HTMLTextAreaElement, Props>(({ onInput }, ref) => {
  return (
    <textarea
      ref={ref}
      rows={1}
      onInput={onInput}
      name="message"
      id="message"
      placeholder="Nhập nội dung..."
      className="px-3 py-3 flex-1 w-full resize-none overflow-y-auto max-h-[120px] border-0 text-[0.9rem] outline-0 bg-transparent"
    />
  );
});

export default memo(ChatInput);
