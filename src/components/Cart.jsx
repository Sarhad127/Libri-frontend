import '../styles/BookList.css';
import { FaTrash } from 'react-icons/fa';

function Cart({ cartItems, onRemoveItem }) {
    if (!cartItems || cartItems.length === 0) return <p>Your cart is empty.</p>;

    return (
        <div className="book-list">
            {cartItems.map((item) => (
                <div key={item.id} className="book-card">
                    {item.imageUrl && (
                        <img src={item.imageUrl} alt={item.bookTitle} className="book-image" />
                    )}
                    <div className="book-info">
                        <h2 className="book-title">{item.bookTitle}</h2>
                        <p className="book-author">av {item.authorName}</p>
                        <p className="book-format-language">{item.format}, {item.language}</p>
                        <p className="book-description">
                            Quantity: {item.quantity}
                        </p>
                        <p className="book-price">Price: ${item.price.toFixed(2)}</p>
                        <button className="remove-button" onClick={() => onRemoveItem(item.id)}>
                            <FaTrash /> Remove
                        </button>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default Cart;