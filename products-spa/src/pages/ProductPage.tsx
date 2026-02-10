import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../api/productsApi';
import { setProducts, setFilter } from '../features/products/productsSlice';
import { RootState } from '../app/store';
import ProductCard from '../components/ProductCard';
import { useNavigate } from 'react-router-dom';

const ProductsPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { items, filter } = useSelector((s: RootState) => s.products);

  useEffect(() => {
    fetchProducts().then(data => dispatch(setProducts(data)));
  }, [dispatch]);

  const visibleProducts =
    filter === 'favorites'
      ? items.filter(p => p.liked)
      : items;

  return (
    <div>
      <h1>Products</h1>

      <button onClick={() => dispatch(setFilter('all'))}>All</button>
      <button onClick={() => dispatch(setFilter('favorites'))}>Favorites</button>
      <button onClick={() => navigate('/create-product')}>Create</button>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16 }}>
        {visibleProducts.map(p => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </div>
  );
};

export default ProductsPage;
