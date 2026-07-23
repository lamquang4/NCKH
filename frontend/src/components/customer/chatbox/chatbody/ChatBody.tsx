import { memo } from "react";
import MessageList from "./MessageList";
import type { MessageResponse } from "../../../../types/type";

interface Props {
  messages: MessageResponse[];
  isLoading: boolean;
  hasMore: boolean;
  loadMore: () => void;
}

function ChatBody({ messages, isLoading, hasMore, loadMore }: Props) {
  return (
    <>
      <div className="flex flex-col flex-1 min-h-0">
        <MessageList
          messages={messages}
          isLoading={isLoading}
          hasMore={hasMore}
          loadMore={loadMore}
        />
      </div>
    </>
  );
}

export default memo(ChatBody);
