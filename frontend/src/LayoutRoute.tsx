import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/client/HomePage";
import ProductCategoryPage from "./pages/client/ProductCategoryPage";

function LayoutRoute() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/products" element={<ProductCategoryPage />} />
    </Routes>
  );
}

export default LayoutRoute;
