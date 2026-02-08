import { useEffect, useState } from 'react';
import Home from './components/Home.jsx';
import './App.css';
import {addToCart, fetchCart, removeCartItem} from "./services/api.js";

function App() {
    const [user, setUser] = useState(null);
    const [showUserPage, setShowUserPage] = useState(false);
    const [showRegisterPage, setShowRegisterPage] = useState(false);
    const [showCart, setShowCart] = useState(false);
    const [cartItems, setCartItems] = useState([]);
    const token = localStorage.getItem('token');

    useEffect(() => {
        const token = localStorage.getItem('token');
        const savedUser = JSON.parse(localStorage.getItem('user'));
        if (token && savedUser) setUser(savedUser);
    }, []);

    const handleLoginSuccess = async (userData) => {
        setUser(userData);
        setShowUserPage(false);
        setShowRegisterPage(false);
    };

    const handleUserPage = () => {
        setShowUserPage(true);
        setShowRegisterPage(false);
    };

    const handleRegisterPage = () => {
        setShowRegisterPage(true);
        setShowUserPage(false);
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setUser(null);
        setShowUserPage(false);
        setShowRegisterPage(false);
    };

    const goToCart = async () => {
        try {
            setShowCart(true);
            const cartItems = await fetchCart(token);
            setCartItems(cartItems);
        } catch (error) {
            console.error('Failed to load cart:', error);
        }
    };

    const handleAddToCart = async (book) => {
        if (!token || !user) return;

        try {
            await addToCart(token, book.id, 1);

            const updatedCart = await fetchCart(token);
            setCartItems(updatedCart);
        } catch (err) {
            console.error('Failed to add to cart', err);
        }
    };

    const handleRemoveFromCart = async (cartItemId) => {

        setCartItems(prev => prev.filter(item => item.id !== cartItemId));

        if (token && user) {
            try {
                await removeCartItem(token, cartItemId);
            } catch (err) {
                console.error('Failed to remove item from backend cart', err);
            }
        }
    };

    return (
        <div className="app-container">
            <Home
                user={user}
                onLoginSuccess={handleLoginSuccess}
                showUserPage={showUserPage}
                showRegisterPage={showRegisterPage}
                onUserPage={handleUserPage}
                onRegisterPage={handleRegisterPage}
                onLogout={handleLogout}
                goToCart={goToCart}
                cartItems={cartItems}
                onAddToCart={handleAddToCart}
                onRemoveFromCart={handleRemoveFromCart}
                showCart={showCart}
            />
        </div>
    );
}

export default App;