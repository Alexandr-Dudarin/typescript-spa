import { Outlet, Link } from 'react-router-dom';
import './Layout.css';
import { BiSolidDog } from "react-icons/bi";

const Layout = () => {
    return (
        <div className="app">
            <header className="app__header">
                <div className="app__header-content">
                    <Link to="/products" className="app__logo">
                        <BiSolidDog className="app__logo-icon" />
                        Dog journal
                    </Link>

                    <nav className="app__nav">
                        <Link to="/products">Products</Link>
                        <Link to="/create-product">Create</Link>
                    </nav>
                </div>
            </header>

            <main className="app__container">
                <Outlet />
            </main>
        </div>
    );
};

export default Layout;
