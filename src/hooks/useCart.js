import { useState, useEffect } from 'react';
import { addToCart, fetchCart, removeCartItem, createOrder } from '../services/api.js';

export function useCart(token, user, setPage) {
    const [cartItems, setCartItems] = useState([]);

    useEffect(() => {
        if (!token) return;
        const loadCart = async () => {
            try {
                const items = await fetchCart(token);
                setCartItems(items);
            } catch (err) {
                console.error('Failed to load cart:', err);
            }
        };
        loadCart();
    }, [token]);

    const goToCart = async () => {
        try {
            const items = await fetchCart(token);
            setCartItems(items);
            setPage('cart');
        } catch (err) {
            console.error('Failed to load cart:', err);
        }
    };

    const handleAddToCart = async (book) => {
        if (!token || !user) return alert('Please log in first.');
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
        if (!token || !user) return;
        try {
            await removeCartItem(token, cartItemId);
        } catch (err) {
            console.error('Failed to remove item from backend cart', err);
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

    const handleConfirmOrder = async (shippingMethod) => {
        if (!token || !user) return alert('Please log in.');
        try {
            await createOrder(token, cartItems, shippingMethod.id);
            setCartItems([]);
        } catch (err) {
            console.error(err);
            alert("Failed to place order: " + err.message);
        }
    };

    return {
        cartItems,
        setCartItems,
        goToCart,
        handleAddToCart,
        handleRemoveFromCart,
        handleUpdateQuantity,
        handleConfirmOrder
    };
}