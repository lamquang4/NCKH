import { Link } from "react-router-dom";
import Image from "../../Image";

interface Props {
  product: any;
}
function ProductCard({ product }: Props) {
  return (
    <div className="space-y-[15px]" key={product.id}>
      <div className="relative group  border-gray-300 border">
        <Link to={`/product`}>
          {product.images.length > 0 && (
            <div className=" w-full overflow-hidden pt-[100%]">
              <Image
                source={product.images[0]}
                alt={product.title}
                className="absolute inset-0 w-full h-full object-cover"
                loading="lazy"
              />
            </div>
          )}
        </Link>

        {product.stock === 0 && (
          <p className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full text-center text-white p-1 font-medium bg-[#C62028] uppercase">
            Hết hàng
          </p>
        )}
      </div>

      <div className="space-y-[6px]">
        <p className="font-normal">
          {product.brand.name} - {product.category.name}
        </p>

        <h5 className="font-medium capitalize">{product.name}</h5>

        <h5 className="font-semibold text-[#E30019]">
          {product.price.toLocaleString("vi-VN")}₫
        </h5>
      </div>
    </div>
  );
}

export default ProductCard;
