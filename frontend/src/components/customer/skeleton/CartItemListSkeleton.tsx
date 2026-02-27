import CartItemSkeleton from "./CartItemSkeleton";
import { memo } from "react";
type Props = {
  count: number;
};

function CartItemListSkeleton({ count }: Props) {
  return (
    <section className="my-[40px] px-[15px] text-black animate-pulse">
      <div className="max-w-[1200px] mx-auto">
        <div className="flex w-full gap-4 lg:flex-row flex-col">
          <div className="space-y-8 py-6 bg-white basis-[60%] h-full">
            {Array.from({ length: count }).map((_, index) => (
              <CartItemSkeleton key={index} />
            ))}
          </div>

          <div className="bg-[#F7F7F7] rounded-sm px-4 py-6 h-auto basis-[40%] space-y-6">
            <div className="flex justify-between items-center">
              <div className="h-5 w-1/3 bg-gray-200 rounded" />
              <div className="h-6 w-1/4 bg-gray-200 rounded" />
            </div>

            <hr className="border-gray-300" />

            <div className="flex flex-col gap-3">
              <div className="h-10 w-full bg-gray-200 rounded-md" />
              <div className="h-10 w-full bg-gray-200 rounded-md" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default memo(CartItemListSkeleton);
