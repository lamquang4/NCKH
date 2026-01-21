import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/client/HomePage";
import ProductListCategoryPage from "./pages/client/ProductListCategoryPage";
import ProductDetailPage from "./pages/client/ProductDetailPage";
import CartPage from "./pages/client/CartPage";

function LayoutRoute() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/products" element={<ProductListCategoryPage />} />
      <Route path="/product" element={<ProductDetailPage />} />
      <Route path="/cart" element={<CartPage />} />
    </Routes>
  );
}

export default LayoutRoute;
