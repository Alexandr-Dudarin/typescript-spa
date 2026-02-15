import { useEffect, useState, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPets } from '../api/petsApi';
import { setPets, setFilter, setSearch, setPage } from '../features/pets/petsSlice';
import type { RootState } from '../app/store';
import PetCard from '../components/PetCard';
import { useNavigate } from 'react-router-dom';
import type { AppDispatch } from '../app/store';
import { setLoading, setError } from '../features/pets/petsSlice';
import SkeletonGrid from '../components/SkeletonGrid';
import Button from '../features/ui/button';
import './PetsPage.css';


const PetsPage = () => {
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();
    const { items, filter, search, page, pageSize, loading, error } = useSelector((s: RootState) => s.pets);

    useEffect(() => {
        dispatch(setPage(1));
    }, [search, filter, dispatch]);


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

    const filteredPets = useMemo(() => {
        return items
            .filter(p => (filter === 'favorites' ? p.liked : true))
            .filter(p =>
                p.title.toLowerCase().includes(search.toLowerCase())
            );
    }, [items, filter, search]);

    const totalPages = useMemo(() => {
        return Math.ceil(filteredPets.length / pageSize) || 0;
    }, [filteredPets, pageSize]);

    const paginatedPets = useMemo(() => {
        return filteredPets.slice(
            (page - 1) * pageSize,
            page * pageSize
        );
    }, [filteredPets, page, pageSize]);

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

                <Button
                    variant={filter === 'all' ? 'active' : 'default'}
                    onClick={() => dispatch(setFilter('all'))}
                >
                    All
                </Button>

                <Button
                    variant={filter === 'favorites' ? 'active' : 'default'}
                    onClick={() => dispatch(setFilter('favorites'))}
                >
                    Favorites
                </Button>

                <Button variant="primary" onClick={() => navigate('/create-pet')}>
                    Create
                </Button>
            </div>

            {loading && <SkeletonGrid count={pageSize} />}

            {error && <p className="pets-page__error">{error}</p>}

            {!loading && !error && (
                <>
                    {filteredPets.length === 0 ? (
                        <p className="pets-page__empty">No pets found</p>
                    ) : (
                        <div className="pets-page__grid">
                            {paginatedPets.map(p => (
                                <PetCard key={p.id} pet={p} />
                            ))}
                        </div>
                    )}
                </>
            )}

            <div className="pets-page__pagination">
                <Button
                    disabled={loading || page === 1}
                    onClick={() => dispatch(setPage(page - 1))}
                >
                    Prev
                </Button>


                <span>
                    Page {page} of {totalPages}
                </span>

                <Button
                    disabled={loading || page === totalPages || totalPages === 0}
                    onClick={() => dispatch(setPage(page + 1))}
                >
                    Next
                </Button>
            </div>

        </div>
    );
};

export default PetsPage;