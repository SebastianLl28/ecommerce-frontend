import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProductsPage from "./features/product/pages/ProductsPage";
import LoginPage from "./features/auth/pages/LoginPage";
import MainLayout from "./components/layout/main/MainLayout";
import ShoppingCartPage from "./features/shopping-cart/pages/ShoppingCartPage";
import CheckoutPage from "./features/checkout/pages/CheckoutPage";
import OrdersListPage from "./features/orders/pages/OrdersListPage";
import OrderSuccessPage from "./features/orders/pages/OrderSuccessPage";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/shopping-cart" element={<ShoppingCartPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/orders" element={<OrdersListPage />} />
          <Route path="/orders/success/:id" element={<OrderSuccessPage />} />
        </Route>

        <Route path="/" index element={<LoginPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
