import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../api/productsApi';
import { setProducts, setFilter, setSearch } from '../features/products/productsSlice';
import type { RootState } from '../app/store';
import ProductCard from '../components/ProductCard';
import { useNavigate } from 'react-router-dom';

const ProductsPage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { items, filter, search } = useSelector((s: RootState) => s.products);


    useEffect(() => {
        if (items.length === 0) {
            fetchProducts().then(data => dispatch(setProducts(data)));
        }
    }, [dispatch, items.length]);


    const visibleProducts = items
        .filter(p => (filter === 'favorites' ? p.liked : true))
        .filter(p =>
            p.title.toLowerCase().includes(search.toLowerCase())
        );


    return (
        <div>
            <h1>Products</h1>
            <input
                type="text"
                placeholder="Search by title..."
                value={search}
                onChange={e => dispatch(setSearch(e.target.value))}
                style={{ marginBottom: 16, padding: 8 }}
            />


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
