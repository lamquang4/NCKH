import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/client/HomePage";
import ProductListCategoryPage from "./pages/client/ProductListCategoryPage";
import ProductDetailPage from "./pages/client/ProductDetailPage";
import CartPage from "./pages/client/CartPage";
import CheckoutPage from "./pages/client/CheckoutPage";
import AccountPage from "./pages/client/AccountPage";
import OrderHistoryPage from "./pages/client/OrderHistoryPage";
import OrderDetailPage from "./pages/client/OrderDetailPage";
import OrderResultPage from "./pages/client/OrderResultPage";

function LayoutRoute() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/products/:slug" element={<ProductListCategoryPage />} />
      <Route path="/product/:slug" element={<ProductDetailPage />} />
      <Route path="/cart" element={<CartPage />} />
      <Route path="/checkout" element={<CheckoutPage />} />
      <Route path="/account/profile" element={<AccountPage />} />
      <Route path="/order/history" element={<OrderHistoryPage />} />
      <Route path="/order/history/:code" element={<OrderDetailPage />} />
      <Route path="/order/result" element={<OrderResultPage />} />
    </Routes>
  );
}

export default LayoutRoute;
