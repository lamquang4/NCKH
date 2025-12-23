import { memo } from "react";
import { LuImagePlus } from "react-icons/lu";

type Props = {
  InputId: string;
  previewImages: string[];
  onPreviewImage: (
    e: React.ChangeEvent<HTMLInputElement>,
    blockIndex: number
  ) => void;
  blockIndex: number;
};
function ChatImage({
  InputId,
  previewImages,
  onPreviewImage,
  blockIndex,
}: Props) {
  console.log("render");
  return (
    <label
      htmlFor={InputId}
      className={`w-9 h-9 flex items-center justify-center rounded-full cursor-pointer
        ${
          previewImages.length > 0
            ? "bg-blue-500 text-white"
            : "bg-gray-200 text-gray-500"
        }`}
    >
      <LuImagePlus size={18} />

      <input
        id={InputId}
        type="file"
        className="hidden"
        name="image"
        accept=".png,.jpg,.webp"
        multiple
        onChange={(e) => onPreviewImage(e, blockIndex)}
      />
    </label>
  );
}

export default memo(ChatImage);
