import { mockCart } from "../../../mocks/mockCart";
import { mockProducts } from "../../../mocks/mockProducts";
import Loading from "../../Loading";
import ProductSlider from "../product/ProductSlider";
import CartItemList from "./CartItemList";

function CartContainer() {
  const cart = mockCart;
  const products = mockProducts;
  const isLoading = false;
  return (
    <>
      {isLoading ? (
        <Loading height={60} size={50} color="black" thickness={2} />
      ) : (
        <>
          <CartItemList cart={cart!} />
          <ProductSlider products={products} title="Bạn có thể thích" />
        </>
      )}
    </>
  );
}

export default CartContainer;
