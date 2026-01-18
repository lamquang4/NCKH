import Image from "../../Image";
import ProductCard from "./ProductCard";
import ProductCardSkeleton from "./ProductCardSkeleton";

interface Props {
  category?: string;
  products: any[];
  isLoading: boolean;
  total: number;
}

function ProductList({ category, products, isLoading, total }: Props) {
  const searchParams = new URLSearchParams(location.search);
  const search = searchParams.get("q");

  return (
    <>
      <div className="mb-[50px] space-y-[15px]">
        {!isLoading && (category || search) && (
          <h2 className=" text-black capitalize">
            {search ? search : category} ({total})
          </h2>
        )}

        {isLoading ? (
          <div className="grid grid-cols-2 gap-x-[12px] gap-y-[35px] lg:grid-cols-3 2xl:grid-cols-4 sm:grid-cols-2">
            {Array.from({ length: 8 }).map((_, index) => (
              <ProductCardSkeleton key={index} />
            ))}
          </div>
        ) : products.length > 0 ? (
          <div
            className={`grid grid-cols-2 gap-x-[10px] gap-y-[35px] lg:grid-cols-3 2xl:grid-cols-4 ${
              products.length <= 0 ? "h-[50vh]" : ""
            }`}
          >
            {products.map((product) => {
              return <ProductCard product={product} key={product.id} />;
            })}
          </div>
        ) : (
          <div className="flex justify-center items-center h-[60vh]">
            <div className="flex flex-col justify-center items-center gap-[15px]">
              <Image
                source={"/assets/notfound1.png"}
                className={"w-[140px]"}
                alt={"not found"}
                loading="eager"
              />

              <h4>Không tìm thấy sách nào</h4>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default ProductList;
