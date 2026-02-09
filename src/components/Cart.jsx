import '../styles/Cart.css';
import BookImage from './BookImage.jsx';
import { FaTrash } from 'react-icons/fa';

function Cart({ cartItems, onRemoveItem }) {
    const token = localStorage.getItem('token');

    if (!cartItems || cartItems.length === 0) return <p>Your cart is empty.</p>;

    return (
        <div className="cart-list">
            {cartItems.map((item) => (
                <div key={item.id} className="cart-card">

                    <BookImage
                        book={{
                            id: item.id,
                            imageUrl: item.imageUrl,
                            title: item.bookTitle,
                            author: item.authorName,
                            format: item.format,
                            language: item.language,
                            price: item.price,
                            description: `Quantity: ${item.quantity}`,
                        }}
                        token={token}
                        className="cart-image-wrapper"
                        imgClassName="cart-image"
                        heartClassName="hide-heart"
                        onClick={() => {}}
                    />

                    <div className="cart-book-info">
                        <h2 className="cart-book-title">{item.bookTitle}</h2>
                        <p className="cart-book-author">av {item.authorName}</p>
                        <p className="cart-book-meta">{item.format}, {item.language}</p>
                        <p className="cart-book-description">Quantity: {item.quantity}</p>
                        <p className="cart-book-price">Price: ${item.price.toFixed(2)}</p>
                        <div className="button-wrapper-delete">
                            <button
                                className="cart-remove-button"
                                onClick={() => onRemoveItem(item.id)}
                            >
                                <FaTrash /> Remove
                            </button>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default Cart;