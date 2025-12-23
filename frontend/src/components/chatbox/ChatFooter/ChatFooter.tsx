import { HiMiniXMark } from "react-icons/hi2";
import { useInputImage } from "../../../hooks/useInputImage";
import Image from "../../Image";
import ImageViewer from "../../ImageViewer";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { useCallback, useRef, useState } from "react";
import ChatInput from "./ChatInput";
import ChatImage from "./ChatImage";
import ChatVoice from "./ChatVoice";
import SendButton from "./SendButton";

function ChatFooter() {
  const [openViewer, setOpenViewer] = useState<boolean>(false);
  const [viewerImage, setViewerImage] = useState<string>("");
  const [hasText, setHasText] = useState<boolean>(false);
  const inputRef = useRef<HTMLTextAreaElement | null>(null);

  const max = 5;
  const { previewImages, handlePreviewImage, handleRemovePreviewImage } =
    useInputImage(max);

  const handleInput = useCallback(() => {
    const el = inputRef.current;
    if (!el) return;

    el.style.height = "auto";
    el.style.height = el.scrollHeight + "px";

    setHasText(el.value.trim().length > 0);
  }, []);

  const handleOpenViewer = (image: string) => {
    setViewerImage(image);
    setOpenViewer(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const message = inputRef.current?.value;
    console.log(message);
  };

  return (
    <div className="border-t border-gray-200 px-3 py-3">
      {previewImages.length > 0 && (
        <div className="pb-3">
          <Swiper
            spaceBetween={8}
            slidesPerView="auto"
            className="!overflow-visible"
          >
            {previewImages.map((image, index) => (
              <SwiperSlide key={index} className="!w-[100px]">
                <div className="relative w-[100px] h-[100px] overflow-hidden rounded-md">
                  <div
                    className="cursor-pointer w-full h-full"
                    onClick={(e) => {
                      e.stopPropagation();
                      e.preventDefault();
                      handleOpenViewer(image);
                    }}
                  >
                    <Image
                      source={image}
                      alt={`preview-${index}`}
                      className="w-full h-full object-cover"
                      loading="eager"
                    />
                  </div>

                  <button
                    type="button"
                    className="absolute top-[6px] right-[6px] bg-white rounded-full flex justify-center items-center border"
                    onClick={(e) => {
                      e.stopPropagation();
                      e.preventDefault();
                      handleRemovePreviewImage(index);
                    }}
                  >
                    <HiMiniXMark size={25} />
                  </button>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      )}

      <div
        className={`border border-gray-300 rounded-2xl transition-all flex items-center gap-2`}
      >
        <form onSubmit={handleSubmit} className="w-full">
          <ChatInput ref={inputRef} onInput={handleInput} />

          <label
            htmlFor="message"
            className={`flex justify-between px-3 pb-3 items-center gap-2 flex-wrap`}
          >
            <div className="flex gap-2">
              <ChatImage
                InputId="images"
                previewImages={previewImages}
                onPreviewImage={handlePreviewImage}
                blockIndex={0}
              />

              <ChatVoice inputRef={inputRef} onInput={handleInput} />
            </div>

            <SendButton hasText={hasText} />
          </label>
        </form>
      </div>

      {openViewer && (
        <ImageViewer
          image={viewerImage}
          open={openViewer}
          onClose={() => setOpenViewer(false)}
        />
      )}
    </div>
  );
}

export default ChatFooter;
