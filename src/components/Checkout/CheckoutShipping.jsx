import React from 'react';
import '../../styles/CheckoutShipping.css';

const SHIPPING_OPTIONS = [
    { id: 'STANDARD', label: 'Standard (3–5 days)', price: 0 },
    { id: 'EXPRESS', label: 'Express (1–2 days)', price: 2 },
    { id: 'STORE_PICKUP', label: 'Store Pickup', price: 0 },
    { id: 'OVERNIGHT', label: 'Overnight', price: 5 },
];

function CheckoutShipping({ selected, onSelect, onNext, onBack }) {
    return (
        <div className="csh-panel">
            <h2 className="csh-heading-main">Select shipping</h2>

            <div className="csh-options">
                {SHIPPING_OPTIONS.map(opt => (
                    <button
                        key={opt.id}
                        className={`csh-option ${selected?.id === opt.id ? 'csh-active' : ''}`}
                        onClick={() => onSelect(opt)}
                    >
                        <span className="csh-dot" />
                        {opt.label} — ${opt.price}
                    </button>
                ))}
            </div>

            <div className="csh-actions">
                <button className="csh-back-button" onClick={onBack}>
                    ← Back
                </button>
                <button className="csh-next-button" disabled={!selected} onClick={onNext}>
                    Review order →
                </button>
            </div>
        </div>
    );
}

export default CheckoutShipping;