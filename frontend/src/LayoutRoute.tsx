import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/client/HomePage";
import ProductListCategoryPage from "./pages/client/ProductListCategoryPage";
import ProductDetailPage from "./pages/client/ProductDetailPage";

function LayoutRoute() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/products" element={<ProductListCategoryPage />} />
      <Route path="/product" element={<ProductDetailPage />} />
    </Routes>
  );
}

export default LayoutRoute;
