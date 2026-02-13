import { User, LogOut } from 'lucide-react';
import {FaShoppingCart} from "react-icons/fa";

function UserButtons({ user, onUserPage, onLogout, cartItems, goToCart }) {

    const totalQuantity = cartItems?.reduce((sum, item) => sum + (item.quantity || 1), 0) || 0;

    return (
        <>
            <button className="cart-button" onClick={goToCart}>
                <FaShoppingCart />
                Cart
                {totalQuantity > 0 && (
                    <span className="cart-count">{totalQuantity}</span>
                )}
            </button>
            <button className="user-btn" onClick={() => onUserPage(user)}>
                <User size={16} style={{ marginRight: '6px', verticalAlign: 'middle' }} />
                {user.username || user.email}
            </button>
            <button className="logout-btn" onClick={onLogout}>
                <LogOut size={16} style={{ marginRight: '6px', verticalAlign: 'middle' }} />
                Logout
            </button>
        </>
    );
}

export default UserButtons;
