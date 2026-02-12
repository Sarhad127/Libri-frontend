import React from 'react';
import '../styles/PromoBar.css';
import { CheckCircle } from 'lucide-react';

function PromoBar() {
    const items = [
        "Low prices",
        "Free shipping over $25",
        "Smooth shipping"
    ];

    return (
        <div className="promo-bar">
            {items.map((text, index) => (
                <div key={index} className="promo-item">
                    <CheckCircle className="check-icon" size={14} />
                    <span>{text}</span>
                </div>
            ))}
        </div>
    );
}

export default PromoBar;