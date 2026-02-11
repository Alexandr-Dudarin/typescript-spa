import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../api/productsApi';
import { setProducts, setFilter, setSearch, setPage } from '../features/products/productsSlice';
import type { RootState } from '../app/store';
import ProductCard from '../components/ProductCard';
import { useNavigate } from 'react-router-dom';
import type { AppDispatch } from '../app/store';

const ProductsPage = () => {
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();
    const { items, filter, search, page, pageSize } = useSelector((s: RootState) => s.products);


    useEffect(() => {
        if (items.length === 0) {
            fetchProducts().then(data => dispatch(setProducts(data)));
        }
    }, [dispatch, items.length]);


    const filteredProducts = items
        .filter(p => (filter === 'favorites' ? p.liked : true))
        .filter(p =>
            p.title.toLowerCase().includes(search.toLowerCase())
        );

    const totalPages = Math.ceil(filteredProducts.length / pageSize);

    const paginatedProducts = filteredProducts.slice(
        (page - 1) * pageSize,
        page * pageSize
    );



    return (
        <div>
            <h1>Products</h1>
            <input
                type="text"
                placeholder="Search by title..."
                value={search}
                onChange={e => {
                    dispatch(setSearch(e.target.value));
                    dispatch(setPage(1));
                }}

                style={{ marginBottom: 16, padding: 8 }}
            />


            <button onClick={() => {
                dispatch(setFilter('all'));
                dispatch(setPage(1));
            }}>
                All
            </button>

            <button onClick={() => {
                dispatch(setFilter('favorites'));
                dispatch(setPage(1));
            }}>
                Favorites
            </button>

            <button onClick={() => navigate('/create-product')}>Create</button>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16 }}>
                {paginatedProducts.map(p => (
                    <ProductCard key={p.id} product={p} />
                ))}
            </div>

            <div style={{ marginTop: 24 }}>
                <button
                    disabled={page === 1}
                    onClick={() => dispatch(setPage(page - 1))}
                >
                    Prev
                </button>

                <span style={{ margin: '0 12px' }}>
                    Page {page} of {totalPages}
                </span>

                <button
                    disabled={page === totalPages || totalPages === 0}
                    onClick={() => dispatch(setPage(page + 1))}
                >
                    Next
                </button>
            </div>

        </div>
    );
};

export default ProductsPage;
