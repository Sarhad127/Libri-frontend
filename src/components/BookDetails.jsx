import '../styles/BookDetails.css';
import BookReviews from './BookReviews.jsx';
import BookImage from "./BookImage.jsx";

function BookDetails({ book, onBack, onReviewAdded, onAddToCart }) {
    const token = localStorage.getItem('token');

    return (
        <div className="book-details">
            <button className="back-button" onClick={onBack}>
                ← Back
            </button>

            <div className="book-details-card">
                <BookImage
                    book={book}
                    token={token}
                    className="book-details-wrapper"
                    heartClassName="book-details-heart"
                    imgClassName="book-details-image"/>

                <div className="book-details-info">
                    <h1 className="title">{book.title}</h1>

                    {book.author && (
                        <p className="author">
                            av {book.author}
                        </p>
                    )}

                    <div className="meta-grid">
                        {book.category && <p><strong>Category:</strong> {book.category}</p>}
                        {book.format && <p><strong>Format:</strong> {book.format}</p>}
                        {book.language && <p><strong>Language:</strong> {book.language}</p>}
                        {book.publisher && <p><strong>Publisher:</strong> {book.publisher}</p>}
                        {book.seriesName && (
                            <p>
                                <strong>Series:</strong> {book.seriesName}
                                {book.seriesNumber != null && ` (#${book.seriesNumber})`}
                            </p>
                        )}
                        {book.isbn && <p><strong>ISBN:</strong> {book.isbn}</p>}
                        <p><strong>Available copies:</strong> {book.amount}</p>
                    </div>

                    <div className="book-price">
                        <h3>
                            Price: <span className="price-number">${book.price.toFixed(2)}</span>
                        </h3>
                    </div>

                    {book.description && (
                        <div className="description">
                            <h3>Description</h3>
                            <p>{book.description}</p>
                        </div>
                    )}
                    <div className="add-to-cart-wrapper">
                        {token && onAddToCart && (
                            <button
                                className="add-to-cart-button-bookdetails"
                                onClick={() => onAddToCart(book)}
                            >
                                Add to Cart
                            </button>
                        )}
                    </div>

                    <BookReviews
                        bookId={book.id}
                        token={token}
                        onReviewAdded={onReviewAdded}
                    />

                    <div className="timestamps">
                        {book.createdAt && (
                            <p>
                                <strong>Added:</strong> {new Date(book.createdAt).toLocaleDateString()}
                            </p>
                        )}
                        {book.updatedAt && (
                            <p>
                                <strong>Last updated:</strong> {new Date(book.updatedAt).toLocaleDateString()}
                            </p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default BookDetails;