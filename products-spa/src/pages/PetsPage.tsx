import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPets } from '../api/petsApi';
import { setPets, setFilter, setSearch, setPage } from '../features/pets/petsSlice';
import type { RootState } from '../app/store';
import PetCard from '../components/PetCard';
import { useNavigate } from 'react-router-dom';
import type { AppDispatch } from '../app/store';
import { setLoading, setError } from '../features/pets/petsSlice';
import './PetsPage.css';


const PetsPage = () => {
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();
    const { items, filter, search, page, pageSize, loading, error } = useSelector((s: RootState) => s.pets);

    const [localSearch, setLocalSearch] = useState(search);

    useEffect(() => {
        const loadPets = async () => {
            try {
                dispatch(setLoading(true));
                dispatch(setError(null));

                const data = await fetchPets();
                dispatch(setPets(data));
            } catch (err) {
                dispatch(setError('Failed to load pets'));
            } finally {
                dispatch(setLoading(false));
            }
        };
        if (items.length === 0) {
            loadPets();
        }
    }, [dispatch, items.length]);

    useEffect(() => {
        const timeout = setTimeout(() => {
            dispatch(setSearch(localSearch));
        }, 500);

        return () => clearTimeout(timeout);
    }, [localSearch, dispatch]);

    useEffect(() => {
        setLocalSearch(search);
    }, [search]);

    const filteredPets = items
        .filter(p => (filter === 'favorites' ? p.liked : true))
        .filter(p =>
            p.title.toLowerCase().includes(search.toLowerCase())
        );

    const totalPages = Math.ceil(filteredPets.length / pageSize) || 0;

    const paginatedPets = filteredPets.slice(
        (page - 1) * pageSize,
        page * pageSize
    );

    return (
        <div className="pets-page">
            <h1>Pets</h1>

            <div className="pets-page__controls">
                <input
                    type="text"
                    placeholder="Search by title..."
                    value={localSearch}
                    onChange={e => setLocalSearch(e.target.value)}
                    className="pets-page__search" />

                <button className={`button ${filter === 'all' ? 'button--active' : ''}`}
                    onClick={() => dispatch(setFilter('all'))}>All</button>
                <button className={`button ${filter === 'favorites' ? 'button--active' : ''}`}
                    onClick={() => dispatch(setFilter('favorites'))}>Favorites</button>
                <button className="button button--primary" onClick={() => navigate('/create-pet')}>Create</button>
            </div>

            {loading && <p className="pets-page__loading">Loading pets...</p>}

            {error && <p className="pets-page__error">{error}</p>}

            {!loading && !error && (

                <div className="pets-page__grid">
                    {paginatedPets.map(p => (
                        <PetCard key={p.id} pet={p} />
                    ))}
                </div>
            )}

            <div className="pets-page__pagination">
                <button
                    className="button"
                    disabled={loading || page === 1}
                    onClick={() => dispatch(setPage(page - 1))}
                >
                    Prev
                </button>

                <span>
                    Page {page} of {totalPages}
                </span>

                <button
                    className="button"
                    disabled={loading || page === totalPages || totalPages === 0}
                    onClick={() => dispatch(setPage(page + 1))}
                >
                    Next
                </button>
            </div>

        </div>
    );
};

export default PetsPage;
