import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useEffect } from "react";
import Loading from "../../../Loading";
import ProductDetail from "./ProductDetail";
import ProductSlider from "../ProductSlider";
import { mockProducts } from "../../../../mocks/mockProducts";
import BreadCrumb from "../../BreadCrumb";

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

  const array = [
    {
      name: "Trang chủ",
      href: "/",
    },
    {
      name: product?.category?.name ?? "",
      href: `/products/${product?.category?.slug ?? ""}`,
    },
    {
      name: product?.name ?? "",
    },
  ];
  return (
    <>
      {isLoading ? (
        <Loading height={70} size={50} color="black" thickness={2} />
      ) : (
        <>
          <BreadCrumb items={array} />
          {product && <ProductDetail product={product} />}
          <ProductSlider products={products} title="Bạn có thể thích" />
        </>
      )}
    </>
  );
}

export default ProductDetailContainer;
