import React, { useState, useEffect } from 'react';
import { API_BASE_URL, fetchUserOrders } from '../services/api.js';
import '../styles/HistoryTab.css';

function HistoryTab() {
    const [orderHistory, setOrderHistory] = useState([]);
    const [bookMap, setBookMap] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const token = localStorage.getItem('token');

    useEffect(() => {
        if (!token) return;
        const fetchOrdersAndBooks = async () => {
            setLoading(true);
            setError(null);

            try {
                const orders = await fetchUserOrders(token);
                setOrderHistory(orders);

                const bookIds = [...new Set(orders.flatMap(o => o.items.map(i => i.bookId)))];
                if (bookIds.length > 0) {
                    const resp = await fetch(`${API_BASE_URL}/books/by-ids?ids=${bookIds.join(',')}`);
                    if (!resp.ok) throw new Error('Failed to fetch books');
                    const books = await resp.json();
                    const map = {};
                    books.forEach(book => { map[book.id] = book; });
                    setBookMap(map);
                }
            } catch (err) {
                console.error(err);
                setError('Failed to load order history.');
            } finally {
                setLoading(false);
            }
        };

        fetchOrdersAndBooks();
    }, []);

    if (loading) return <p>Loading order history...</p>;
    if (error) return <p>{error}</p>;
    if (!orderHistory || orderHistory.length === 0) {
        return (
            <div className="order-history">
                <h3>Order History</h3>
                <p>No orders made yet.</p>
            </div>
        );
    }

    return (
        <div className="order-history">
            {orderHistory.map(order => (
                <div key={order.id} className="order-card">
                    <div className="order-header">
                        <p><strong>Order ID:</strong> {order.orderNumber}</p>
                        <p>
                            <strong>Status:</strong>{' '}
                            <span className={`status-badge ${order.status.toLowerCase()}`}>
                            {order.status === 'PLACED' ? 'Pending Payment' : order.status}
                            </span>
                        </p>
                        <p><strong>Total:</strong> ${order.totalAmount.toFixed(2)}</p>
                        <p>
                            <strong>Order Date:</strong>{' '}
                            {new Date(order.createdAt).toLocaleDateString('en-US', {
                                year: 'numeric',
                                month: 'short',
                                day: 'numeric',
                            })}{' '}
                            at{' '}
                            {new Date(order.createdAt).toLocaleTimeString('en-US', {
                                hour: '2-digit',
                                minute: '2-digit',
                            })}
                        </p>
                    </div>

                    <table className="order-items-table">
                        <thead>
                        <tr>
                            <th>Book</th>
                            <th>Quantity</th>
                            <th>Price</th>
                            <th>Subtotal</th>
                        </tr>
                        </thead>
                        <tbody>
                        {order.items.map(item => {
                            const book = bookMap[item.bookId];
                            return (
                                <tr key={`${order.id}-${item.id}`}>
                                    <td>{book ? `${book.title} by ${book.author}` : `Book ID ${item.bookId}`}</td>
                                    <td>{item.quantity}</td>
                                    <td>${item.priceAtPurchase.toFixed(2)}</td>
                                    <td>${(item.priceAtPurchase * item.quantity).toFixed(2)}</td>
                                </tr>
                            );
                        })}
                        </tbody>
                    </table>
                </div>
            ))}
        </div>
    );
}

export default HistoryTab;