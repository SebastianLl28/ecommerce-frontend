import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProductsPage from "./features/product/pages/ProductsPage";
import LoginPage from "./features/auth/pages/LoginPage";
import MainLayout from "./components/layout/main/MainLayout";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Main Layout ( Header, Footer, Sidebar, etc) */}
        <Route element={<MainLayout />}>
          <Route path="/products" element={<ProductsPage />} />
        </Route>

        <Route path="/" index element={<LoginPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
