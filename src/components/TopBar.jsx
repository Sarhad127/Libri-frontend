import UserButtons from './UserButtons.jsx';
import LoginDropdownWrapper from './LoginDropdownWrapper.jsx';
import '../styles/TopBar.css';
import {FaShoppingCart} from "react-icons/fa";

function TopBar({ user, goToRegister, onLoginSuccess, onUserPage, onLogout, showRegisterPage, goToCart }) {
    return (
        <div className="top-bar">
            <input type="text" placeholder="Search books..." />
            <button>Search</button>

            <div className="top-bar-buttons">
                {user ? (
                    <>
                        <button className="cart-button" onClick={goToCart} >
                            <FaShoppingCart/>
                            Cart
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