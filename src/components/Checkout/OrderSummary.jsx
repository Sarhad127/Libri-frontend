import React from 'react';
import '../../styles/OrderSummary.css';

function OrderSummary({ order, onBackToHome }) {
    if (!order) return null;

    const { items, shippingMethod, subtotal, user } = order;
    const total = subtotal + (shippingMethod?.price || 0);

    return (
        <div className="os-panel">
            <h2 className="os-heading-main">Thank you for your order!</h2>
            <p>Your order has been successfully placed. Here’s a summary:</p>

            {user && (
                <div className="os-user-info">
                    <h3>User Information</h3>
                    <div><strong>First name:</strong> {user.firstName || '—'}</div>
                    <div><strong>Last name:</strong> {user.lastName || '—'}</div>
                    <div><strong>Email:</strong> {user.email || '—'}</div>
                    <div><strong>Phone:</strong> {user.phoneNumber || '—'}</div>
                    <div><strong>Address:</strong> {user.address || '—'}</div>
                </div>
            )}

            <div className="os-items">
                <h3>Items</h3>
                {items.map(item => (
                    <div key={item.id} className="os-item">
                        {item.bookTitle} × {item.quantity} — ${(item.price * item.quantity).toFixed(2)}
                    </div>
                ))}
            </div>

            <p className="os-shipping">
                <strong>Shipping:</strong> {shippingMethod?.label} (${shippingMethod?.price.toFixed(2) || 0})
            </p>

            <p className="os-total">
                <strong>Total:</strong> ${total.toFixed(2)}
            </p>

            <div className="os-actions">
                <button className="os-home-button" onClick={onBackToHome}>
                    ← Back to Home
                </button>
            </div>
        </div>
    );
}

export default OrderSummary;