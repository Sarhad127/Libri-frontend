import UserButtons from '../Buttons/UserButtons.jsx';
import '../../styles/TopBar.css';
import {useState} from "react";
import OpenBookIcon from '../../assets/open-book.png';

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
                        <UserButtons
                            user={user}
                            onUserPage={onUserPage}
                            onLogout={onLogout}
                            cartItems={cartItems}
                            goToCart={goToCart}
                        />
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