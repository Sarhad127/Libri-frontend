import React from 'react';
import '../../styles/AddToCartButton.css';

function AddToCartButton({ book, onAddToCart }) {
    return (
        <button
            className = 'add-to-cart-button'
            onClick={(e) => {
                e.stopPropagation();
                onAddToCart(book);
            }}
        >
            Add to Cart
        </button>
    );
}

export default AddToCartButton;