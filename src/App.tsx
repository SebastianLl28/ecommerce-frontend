import { BrowserRouter, Routes, Route } from 'react-router-dom'
import ProductsPage from "./features/product/pages/ProductsPage"
import LoginPage from './features/auth/pages/LoginPage'

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/products" element={<ProductsPage />} />
        <Route path='/' index element={<LoginPage/>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
