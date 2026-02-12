import UserButtons from './UserButtons.jsx';
import '../styles/TopBar.css';
import { FaShoppingCart } from "react-icons/fa";
import {useState} from "react";
import OpenBookIcon from '../assets/open-book.png';

function TopBar({
                    user,
                    onUserPage,
                    onLogout,
                    goToCart,
                    cartItems,
                    onSearch,
                    setPage
}) {

    const [searchTerm, setSearchTerm] = useState('');
    const totalQuantity = cartItems?.reduce((sum, item) => sum + (item.quantity || 1), 0) || 0;

    const handleSearch = () => {
        onSearch(searchTerm.trim());
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            handleSearch();
        }
    };

    return (
        <div className="top-bar">
            <div className="top-bar-left">
                <div className="top-bar-logo">
                    <img src={OpenBookIcon} alt="Open Book" className="top-bar-icon" />
                    <h1 className="top-bar-title">Libri</h1>
                </div>
            </div>

            <div className="top-bar-search">
                <input
                    type="text"
                    placeholder="Search books..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    onKeyDown={handleKeyDown}
                />
                <button onClick={handleSearch}>Search</button>
            </div>

            <div className="top-bar-buttons">
                {user ? (
                    <>
                        <button className="cart-button" onClick={goToCart}>
                            <FaShoppingCart />
                            Cart
                            {totalQuantity > 0 && (
                                <span className="cart-count">{totalQuantity}</span>
                            )}
                        </button>

                        <UserButtons user={user} onUserPage={onUserPage} onLogout={onLogout} />
                    </>
                ) : (
                    <button className="login-btn" onClick={() => setPage('login')}>
                        Login
                    </button>
                )}
            </div>
        </div>
    );
}

export default TopBar;