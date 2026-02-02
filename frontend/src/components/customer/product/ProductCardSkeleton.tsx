function ProductCardSkeleton() {
  return (
    <div className="animate-pulse">
      <div className="w-full pt-[100%] bg-gray-200 relative mb-[12px]" />

      <div className="h-[14px] bg-gray-200 rounded mb-[8px]" />

      <div className="h-[12px] bg-gray-200 rounded w-2/3 mb-[10px]" />

      <div className="h-[14px] bg-gray-300 rounded w-1/2" />
    </div>
  );
}

export default ProductCardSkeleton;
