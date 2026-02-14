import '../styles/Cart.css';
import BookImage from './Book/BookImage.jsx';
import { FaTrash } from 'react-icons/fa';

function Cart({ cartItems = [], onRemoveItem, onUpdateQuantity, onCheckout }) {
    const token = localStorage.getItem('token');

    const total = cartItems.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
    );

    return (
        <div className="cart-list">
            <h1 className="cart-page-title">Shopping Cart</h1>

            <div className="cart-header">
                <div className="cart-col item">Item</div>
                <div className="cart-col price">Price</div>
                <div className="cart-col quantity">Quantity</div>
                <div className="cart-col total">Total</div>
                <div className="cart-col actions">Actions</div>
            </div>

            {cartItems.length === 0 ? (
                <p className="empty-cart-text">Your cart is empty.</p>
            ) : (
                cartItems.map((item) => (
                    <div key={item.id} className="cart-card">
                        <div className="cart-col item">
                            <BookImage
                                book={{
                                    id: item.id,
                                    imageUrl: item.imageUrl,
                                    title: item.bookTitle,
                                    author: item.authorName,
                                    format: item.format,
                                    language: item.language,
                                    price: item.price,
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
                            </div>
                        </div>

                        <div className="cart-col price">
                            ${item.price.toFixed(2)}
                        </div>

                        <div className="cart-col quantity">
                            <button
                                onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                                disabled={item.quantity <= 1}
                            >
                                -
                            </button>
                            <span className="cart-quantity">{item.quantity}</span>
                            <button
                                onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                            >
                                +
                            </button>
                        </div>

                        <div className="cart-col total">
                            ${(item.price * item.quantity).toFixed(2)}
                        </div>

                        <div className="cart-col actions">
                            <button
                                className="cart-remove-button"
                                onClick={() => onRemoveItem(item.id)}
                            >
                                <FaTrash /> Remove
                            </button>
                        </div>
                    </div>
                ))
            )}

            <div className="cart-total-wrapper">
                <p className="cart-total">
                    <strong>Total:</strong> ${total.toFixed(2)}
                </p>
            </div>

            <div className="cart-checkout-wrapper">
                <button
                    className="checkout-button"
                    onClick={onCheckout}
                    disabled={cartItems.length === 0}
                >
                    Proceed to checkout
                </button>
            </div>
        </div>
    );
}

export default Cart;