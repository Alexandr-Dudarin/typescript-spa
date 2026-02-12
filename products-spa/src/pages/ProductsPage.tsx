import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../api/productsApi';
import { setProducts, setFilter, setSearch, setPage } from '../features/products/productsSlice';
import type { RootState } from '../app/store';
import ProductCard from '../components/ProductCard';
import { useNavigate } from 'react-router-dom';
import type { AppDispatch } from '../app/store';
import './ProductsPage.css';


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

    const totalPages = Math.ceil(filteredProducts.length / pageSize) || 0;

    const paginatedProducts = filteredProducts.slice(
        (page - 1) * pageSize,
        page * pageSize
    );

    console.log("page:", page); 
    console.log("totalPages:", totalPages);


    return (
        <div className="products-page">
            <h1>Pets</h1>

            <div className="products-page__controls">
                <input
                    type="text"
                    placeholder="Search by title..."
                    value={search}
                    onChange={e => dispatch(setSearch(e.target.value))}
                    className="products-page__search" />

                <button className={`button ${filter === 'all' ? 'button--active' : ''}`}
                    onClick={() => dispatch(setFilter('all'))}>All</button>
                <button className={`button ${filter === 'favorites' ? 'button--active' : ''}`}
                    onClick={() => dispatch(setFilter('favorites'))}>Favorites</button>
                <button className="button button--primary" onClick={() => navigate('/create-product')}>Create</button>
            </div>

            <div className="products-page__grid">
                {paginatedProducts.map(p => (
                    <ProductCard key={p.id} product={p} />
                ))}
            </div>

            <div className="products-page__pagination">
                <button
                    className="button"
                    disabled={page === 1}
                    onClick={() => dispatch(setPage(page - 1))}
                >
                    Prev
                </button>

                <span>
                    Page {page} of {totalPages}
                </span>

                <button
                    className="button"
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
