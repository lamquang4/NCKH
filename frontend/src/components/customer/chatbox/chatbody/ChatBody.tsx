import { memo } from "react";
import MessageList from "./MessageList";
import type { MessageResponse } from "../../../../types/type";
type Props = {
  messages: MessageResponse[];
};
function ChatBody({ messages }: Props) {
  return (
    <>
      <div className="flex flex-col flex-1 min-h-0">
        <MessageList messages={messages} />
      </div>
    </>
  );
}

export default memo(ChatBody);
