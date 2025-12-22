import Image from "../Image";

type props = {
  type: "user" | "ai";
  text: string;
};

function MessageItem({ type, text }: props) {
  return (
    <div
      className={`flex items-center gap-2 ${
        type === "user" ? "justify-end" : "justify-start"
      }`}
    >
      {type === "ai" && (
        <Image
          className="w-9 h-9 rounded-full"
          source="/assets/troly.png"
          alt="troly"
          loading="lazy"
        />
      )}

      <div
        className={`
        max-w-[75%] px-4 py-2 rounded-3xl
        break-anywhere whitespace-pre-wrap
        ${type === "ai" ? "bg-gray-100 text-black" : "bg-blue-600 text-white"}
      `}
      >
        <div>{text}</div>
      </div>
    </div>
  );
}

export default MessageItem;
