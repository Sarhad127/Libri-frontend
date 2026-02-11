import React from 'react';
import './CheckoutReview.css';

function CheckoutReview({ cartItems, shippingMethod, onBack, onRemoveItem, onConfirmOrder }) {
    const subtotal = cartItems.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
    );
    const total = subtotal + shippingMethod.price;

    const handleCheckout = async () => {
        try {
            await onConfirmOrder(shippingMethod);
            cartItems.forEach(item => onRemoveItem?.(item.id));
        } catch (err) {
            console.error(err);
            alert(`Failed to place order: ${err.message}`);
        }
    };

    return (
        <div className="crv-panel">
            <h2 className="crv-heading-main">Review your order</h2>

            <div className="crv-items">
                {cartItems.map(item => (
                    <div key={item.id} className="crv-item">
                        {item.bookTitle} × {item.quantity}
                    </div>
                ))}
            </div>

            <p className="crv-shipping"><strong>Shipping:</strong> {shippingMethod.label}</p>
            <p className="crv-total"><strong>Total:</strong> ${total.toFixed(2)}</p>

            <div className="crv-actions">
                <button className="crv-back-button" onClick={onBack}>
                    ↑ Back
                </button>
                <button className="crv-confirm-button" onClick={handleCheckout}>
                    Confirm & place order
                </button>
            </div>
        </div>
    );
}

export default CheckoutReview;