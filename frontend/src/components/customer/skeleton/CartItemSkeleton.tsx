function CartItemSkeleton() {
  return (
    <>
      <div className="w-full space-y-[20px] animate-pulse">
        <div className="flex gap-[10px] w-full sm:flex-row flex-col">
          <div className="mx-auto bg-gray-200 w-[200px] h-[200px] rounded" />

          <div className="flex flex-col gap-4 w-full">
            <div className="flex justify-between gap-[15px]">
              <div className="flex flex-col gap-2 w-full">
                <div className="h-5 bg-gray-200 rounded w-3/4" />
                <div className="h-4 bg-gray-200 rounded w-1/2" />
              </div>

              <div className="w-5 h-5 bg-gray-200 rounded" />
            </div>

            <div className="flex-wrap justify-between flex gap-4 mt-auto">
              <div className="flex items-center gap-1">
                <div className="w-7 h-7 bg-gray-200 rounded" />
                <div className="w-7 h-7 bg-gray-200 rounded" />
                <div className="w-7 h-7 bg-gray-200 rounded" />
              </div>

              <div className="h-5 bg-gray-200 rounded w-1/4" />
            </div>
          </div>
        </div>
      </div>

      <hr className="border-gray-300" />
    </>
  );
}

export default CartItemSkeleton;
