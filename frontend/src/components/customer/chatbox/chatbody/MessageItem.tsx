import toast from "react-hot-toast";
import Image from "../../../ui/Image";
import MessageAction from "./MessageAction";
import { memo, useCallback } from "react";
import MessageProductList from "./MessageProductList";
import type { ProductListItemResponse } from "../../../../types/type";

type props = {
  type: "ASSISTANT" | "USER";
  text: string;
  products?: ProductListItemResponse[];
};

function MessageItem({ type, text, products }: props) {
  const handleCopy = useCallback(async () => {
    await navigator.clipboard.writeText(text);
    toast.success("Đã sao chép tin nhắn");
  }, [text]);

  return (
    <div
      className={`flex gap-2 ${
        type === "ASSISTANT" ? "justify-start" : "justify-end"
      }`}
    >
      {type === "ASSISTANT" && (
        <Image
          className="w-10 h-10 rounded-full self-start"
          source="/assets/troly.png"
          alt="troly"
          loading="lazy"
        />
      )}

      <div
        className={`flex flex-col max-w-[75%] gap-2 ${
          type === "ASSISTANT" ? "items-start" : "items-end"
        }`}
      >
        <div
          className={`inline-block px-4 py-2 rounded-xl break-anywhere whitespace-pre-wrap   ${
            type === "ASSISTANT"
              ? "bg-gray-100 text-black"
              : "bg-primary text-white"
          }
      `}
        >
          {text}
        </div>

        {type === "ASSISTANT" && products && (
          <MessageProductList products={products} />
        )}

        <MessageAction onCopy={handleCopy} />
      </div>
    </div>
  );
}

export default memo(MessageItem);
