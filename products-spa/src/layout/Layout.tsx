import { Outlet, Link, NavLink, useLocation } from 'react-router-dom';
import { BiSolidDog } from "react-icons/bi";
import { useDispatch, useSelector } from 'react-redux';
import type { RootState } from '../app/store';
import { toggleTheme } from '../features/ui/uiSlice';
import { useEffect } from 'react';
import Button from '../features/ui/button';
import { FiMoon, FiSun } from "react-icons/fi";
import './Layout.css';

const Layout = () => {
    const dispatch = useDispatch();
    const theme = useSelector((state: RootState) => state.ui.theme);

    useEffect(() => {
        document.body.dataset.theme = theme;
        localStorage.setItem('theme', theme);
    }, [theme]);

    const location = useLocation();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [location.pathname]);


    return (
        <div className="app">
            <header className="app__header">
                <div className="app__header-content">
                    <Link to="/pets" className="app__logo">
                        <BiSolidDog className="app__logo-icon" />
                        Dog journal
                    </Link>

                    <nav className="app__nav">
                        <NavLink
                            to="/pets"
                            className={({ isActive }) => (isActive ? 'active' : undefined)}
                        >
                            Pets
                        </NavLink>

                        <NavLink
                            to="/create-pet"
                            className={({ isActive }) => (isActive ? 'active' : undefined)}
                        >
                            Create
                        </NavLink>
                    </nav>

                    <Button variant="ghost" onClick={() => dispatch(toggleTheme())}>
                        {theme === 'light' ? <FiMoon /> : <FiSun />}
                    </Button>


                </div>
            </header>

            <main className="app__container">
                <Outlet />
            </main>
        </div>
    );
};

export default Layout;