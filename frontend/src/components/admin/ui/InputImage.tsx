import { memo, useEffect, useRef, useState } from "react";
import Image from "../../ui/Image";
import { HiMiniXMark } from "react-icons/hi2";
import ImageViewer from "../../ui/ImageViewer";
import { ReactSortable } from "react-sortablejs";
import Button from "../../ui/Button";
import Label from "../../ui/Label";
import Input from "../../ui/Input";
import { LuCloudUpload } from "react-icons/lu";
type SortableImage = {
  id: string;
  url: string;
};

type Props = {
  InputId: string;
  previewImages: string[];
  onPreviewImage: (
    e: React.ChangeEvent<HTMLInputElement>,
    blockIndex: number,
  ) => void;
  onRemovePreviewImage: (index: number, blockIndex: number) => void;
  onReorderImages: (orderedUrls: string[]) => void;
  blockIndex: number;
};
function InputImage({
  InputId,
  previewImages,
  onPreviewImage,
  onRemovePreviewImage,
  onReorderImages,
  blockIndex,
}: Props) {
  const [openViewer, setOpenViewer] = useState<boolean>(false);
  const [viewerImage, setViewerImage] = useState<string>("");
  const [sortableItems, setSortableItems] = useState<SortableImage[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setSortableItems((prev) => {
      if (prev.length === previewImages.length) return prev;
      return previewImages.map((url) => ({ id: url, url }));
    });
  }, [previewImages]);

  const handleOpenViewer = (image: string) => {
    setViewerImage(image);
    setOpenViewer(true);
  };

  const handleDrop = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    e.stopPropagation();

    const files = e.dataTransfer.files;
    if (!files || files.length === 0) return;

    const syntheticEvent = {
      target: { files, value: "" },
    } as unknown as React.ChangeEvent<HTMLInputElement>;

    onPreviewImage(syntheticEvent, blockIndex);
  };

  const handleDragOver = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
  };

  return (
    <div className="flex items-center justify-center w-full h-full">
      <Label
        htmlFor={InputId}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        className="flex flex-col p-[15px] items-center justify-center w-full min-h-70 h-full border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 "
      >
        {!previewImages.length ? (
          <div className="flex flex-col items-center justify-center text-neutral space-y-4">
            <LuCloudUpload size={48} />

            <div className="space-y-2 text-center">
              <p className="font-semibold">Bấm để tải, kéo hoặc thả</p>
              <p>PNG, JPG, WEBP</p>
            </div>
          </div>
        ) : (
          <ReactSortable
            list={sortableItems}
            setList={(newItems) => {
              setSortableItems(newItems);
              onReorderImages(newItems.map((item) => item.url));
            }}
            animation={200}
            className={`${
              previewImages.length === 1
                ? "flex justify-center items-center"
                : "grid md:grid-cols-4 grid-cols-2 items-center"
            } gap-3 h-70 overflow-y-auto`}
          >
            {sortableItems.map((item, index) => (
              <div
                className=" relative"
                key={item.id}
                onClick={(e) => e.stopPropagation()}
              >
                <div
                  className="cursor-pointer"
                  onClick={(e) => {
                    e.stopPropagation();
                    e.preventDefault();
                    handleOpenViewer(item.url);
                  }}
                >
                  <Image
                    src={item.url}
                    alt={`preview-${index}`}
                    className="w-[150px]"
                    loading="eager"
                  />
                </div>

                <div className="absolute top-[6px] right-[6px]">
                  <Button
                    type="button"
                    className="bg-white rounded-full flex justify-center items-center border-2"
                    onClick={(e) => {
                      e.stopPropagation();
                      e.preventDefault();
                      onRemovePreviewImage(index, blockIndex);
                    }}
                  >
                    <HiMiniXMark size={20} />
                  </Button>
                </div>
              </div>
            ))}
          </ReactSortable>
        )}

        <Input
          ref={inputRef}
          id={InputId}
          type="file"
          className="hidden"
          name="image"
          accept=".png,.jpg,.webp"
          multiple
          onChange={(e) => onPreviewImage(e, blockIndex)}
        />
      </Label>

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

export default memo(InputImage);
