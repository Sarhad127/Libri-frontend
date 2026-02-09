import UserButtons from './UserButtons.jsx';
import LoginDropdownWrapper from './LoginDropdownWrapper.jsx';
import '../styles/TopBar.css';
import { FaShoppingCart } from "react-icons/fa";
import {useState} from "react";

function TopBar({
                    user,
                    goToRegister,
                    onLoginSuccess,
                    onUserPage,
                    onLogout,
                    showRegisterPage,
                    goToCart,
                    cartItems,
                    onSearch}) {

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
                <h1 className="top-bar-title">Libri</h1>
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
                        <button className="cart-button" onClick={goToCart} >
                            <FaShoppingCart/>
                            Cart
                            {totalQuantity > 0 && (
                                <span className="cart-count">{totalQuantity}</span>
                            )}
                        </button>

                        <UserButtons user={user} onUserPage={onUserPage} onLogout={onLogout} />
                    </>
                ) : (
                    <LoginDropdownWrapper
                        goToRegister={goToRegister}
                        onLoginSuccess={onLoginSuccess}
                        showRegisterPage={showRegisterPage}
                    />
                )}
            </div>
        </div>
    );
}

export default TopBar;