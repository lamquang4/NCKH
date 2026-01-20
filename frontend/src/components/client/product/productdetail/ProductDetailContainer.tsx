import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useEffect } from "react";
import Loading from "../../../Loading";
import ProductDetail from "./ProductDetail";
import ProductSlider from "../ProductSlider";
import { mockProducts } from "../../../../mocks/mockProducts";

function ProductDetailContainer() {
  // const { slug } = useParams();
  const navigate = useNavigate();
  const isLoading = false;
  const product = mockProducts[1];
  const products = mockProducts;

  useEffect(() => {
    if (isLoading) return;

    if (!product) {
      toast.error("Sách không tìm thấy");
      navigate("/", { replace: true });
      return;
    }
  }, [product, isLoading, navigate]);
  return (
    <>
      {isLoading ? (
        <Loading height={70} size={50} color="black" thickness={2} />
      ) : (
        <>
          {product && <ProductDetail product={product} />}
          <ProductSlider products={products} title="Bạn có thể thích" />
        </>
      )}
    </>
  );
}

export default ProductDetailContainer;
