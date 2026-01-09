import { useCallback, useRef, useState } from "react";
import ChatInput from "./ChatInput";
import ChatVoice from "./ChatVoice";
import SendButton from "./SendButton";

function ChatFooter() {
  const [hasText, setHasText] = useState<boolean>(false);
  const inputRef = useRef<HTMLTextAreaElement | null>(null);

  const handleInput = useCallback(() => {
    const el = inputRef.current;
    if (!el) return;

    el.style.height = "auto";
    el.style.height = el.scrollHeight + "px";

    setHasText(el.value.trim().length > 0);
  }, []);

  const handleSubmit = (e?: React.FormEvent) => {
    e?.preventDefault();

    const message = inputRef.current?.value?.trim();

    if (!message) {
      return;
    }

    console.log(message);

    inputRef.current!.value = "";
    inputRef.current!.style.height = "auto";
    setHasText(false);
  };

  return (
    <div className="border-t border-gray-200 px-3 py-3">
      <div
        className={`border border-gray-300 rounded-2xl transition-all flex items-center gap-2`}
      >
        <form onSubmit={handleSubmit} className="w-full">
          <ChatInput
            ref={inputRef}
            onInput={handleInput}
            onSubmit={handleSubmit}
          />

          <label
            htmlFor="message"
            className={`flex justify-between px-3 pb-3 items-center gap-2 flex-wrap`}
          >
            <div className="flex gap-2">
              <ChatVoice inputRef={inputRef} onInput={handleInput} />
            </div>

            <SendButton hasText={hasText} />
          </label>
        </form>
      </div>
    </div>
  );
}

export default ChatFooter;
