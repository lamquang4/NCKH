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
import LoginPage from "./pages/admin/LoginPage";
import PaymentListPage from "./pages/admin/PaymentListPage";
import AccountAdminPage from "./pages/admin/AccountPage";
import AdminListPage from "./pages/admin/AdminListPage";
import CustomerListPage from "./pages/admin/CustomerListPage";
import AddAdminPage from "./pages/admin/AddAdminPage";
import EditAdminPage from "./pages/admin/EditAdminPage";
import BrandListPage from "./pages/admin/BrandListPage";
import AddBrandPage from "./pages/admin/AddBrandPage";
import EditBrandPage from "./pages/admin/EditBrandPage";
import CategoryListPage from "./pages/admin/CategoryListPage";
import AddCategoryPage from "./pages/admin/AddCategoryPage";
import EditCategoryPage from "./pages/admin/EditCategoryPage";
import OrderListPage from "./pages/admin/OrderListPage";
import OrderDetailAdmin from "./pages/admin/OrderDetailPage";
import ProductListPage from "./pages/admin/ProductListPage";
import AddProductPage from "./pages/admin/AddProductPage";
import EditProductPage from "./pages/admin/EditProductPage";
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

      <Route path="/admin/login" element={<LoginPage />} />
      <Route path="/admin/account/profile" element={<AccountAdminPage />} />
      <Route path="/admin/payments" element={<PaymentListPage />} />

      <Route path="/admin/admins" element={<AdminListPage />} />
      <Route path="/admin/add-admin" element={<AddAdminPage />} />
      <Route path="/admin/edit-admin/:id" element={<EditAdminPage />} />

      <Route path="/admin/customers" element={<CustomerListPage />} />

      <Route path="/admin/products" element={<ProductListPage />} />
      <Route path="/admin/add-product" element={<AddProductPage />} />
      <Route path="/admin/edit-product/:id" element={<EditProductPage />} />

      <Route path="/admin/brands" element={<BrandListPage />} />
      <Route path="/admin/add-brand" element={<AddBrandPage />} />
      <Route path="/admin/edit-brand/:id" element={<EditBrandPage />} />

      <Route path="/admin/categories" element={<CategoryListPage />} />
      <Route path="/admin/add-category" element={<AddCategoryPage />} />
      <Route path="/admin/edit-category/:id" element={<EditCategoryPage />} />

      <Route path="/admin/orders" element={<OrderListPage />} />
      <Route path="/admin/order/:id" element={<OrderDetailAdmin />} />
    </Routes>
  );
}

export default LayoutRoute;
