import { Routes, Route, Navigate } from 'react-router-dom';
import ProductsPage from '../pages/ProductsPage';
import ProductPage from '../pages/ProductPage';
import CreateProductPage from '../pages/CreateProductPage';

const AppRouter = () => (
  <Routes>
    <Route path="/" element={<Navigate to="/products" />} />
    <Route path="/products" element={<ProductsPage />} />
    <Route path="/products/:id" element={<ProductPage />} />
    <Route path="/create-product" element={<CreateProductPage />} />
  </Routes>
);

export default AppRouter;
