import { Outlet, Link } from 'react-router-dom';
import { BiSolidDog } from "react-icons/bi";
import { useDispatch, useSelector } from 'react-redux';
import type { RootState } from '../app/store';
import { toggleTheme } from '../features/ui/uiSlice';
import { useEffect } from 'react';
import './Layout.css';

const Layout = () => {
    const dispatch = useDispatch();
    const theme = useSelector((state: RootState) => state.ui.theme);

    useEffect(() => {
        document.body.dataset.theme = theme;
    }, [theme]);

    return (
        <div className="app">
            <header className="app__header">
                <div className="app__header-content">
                    <Link to="/pets" className="app__logo">
                        <BiSolidDog className="app__logo-icon" />
                        Dog journal
                    </Link>

                    <nav className="app__nav">
                        <Link to="/pets">Pets</Link>
                        <Link to="/create-pet">Create</Link>
                    </nav>
                    <button
                        className="theme-toggle"
                        onClick={() => dispatch(toggleTheme())}
                    >
                        {theme === 'light' ? '🌙' : '☀'}
                    </button>
                </div>
            </header>

            <main className="app__container">
                <Outlet />
            </main>
        </div>
    );
};

export default Layout;
