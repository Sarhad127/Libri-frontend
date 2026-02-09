import { useEffect, useState } from 'react';
import Home from './components/Home.jsx';
import './App.css';
import {addToCart, fetchCart, removeCartItem} from "./services/api.js";

function App() {
    const [user, setUser] = useState(null);
    const [cartItems, setCartItems] = useState([]);
    const token = localStorage.getItem('token');
    const [page, setPage] = useState('home');

    useEffect(() => {
        const savedUser = JSON.parse(localStorage.getItem('user'));
        if (token && savedUser) {
            setUser(savedUser);
            fetchCart(token)
                .then(cart => setCartItems(cart))
                .catch(err => console.error('Failed to load cart:', err));
        }
    }, [token]);

    const handleLoginSuccess = async (userData) => {
        setUser(userData);
        setPage('home');

        if (userData.token || token) {
            try {
                const savedCart = await fetchCart(token || userData.token);
                setCartItems(savedCart);
            } catch (err) {
                console.error('Failed to load cart on login:', err);
            }
        }
    };

    const handleUserPage = () => setPage('user');
    const handleRegisterPage = () => setPage('register');

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setUser(null);
        setCartItems([]);
        setPage('home');
    };

    const goToCart = async () => {
        try {
            const cartItems = await fetchCart(token);
            setCartItems(cartItems);
            setPage('cart');
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

    const handleUpdateQuantity = (cartItemId, newQuantity) => {
        if (newQuantity < 1) return;

        setCartItems(prev =>
            prev.map(item =>
                item.id === cartItemId ? { ...item, quantity: newQuantity } : item
            )
        );
    };

    return (
        <div className="app-container">
            <Home
                user={user}
                onLoginSuccess={handleLoginSuccess}
                onUserPage={handleUserPage}
                onRegisterPage={handleRegisterPage}
                onLogout={handleLogout}
                goToCart={goToCart}
                cartItems={cartItems}
                onAddToCart={handleAddToCart}
                onRemoveFromCart={handleRemoveFromCart}
                onUpdateQuantity={handleUpdateQuantity}
                page={page}
                setPage={setPage}
            />
        </div>
    );
}

export default App;