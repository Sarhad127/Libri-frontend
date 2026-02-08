import '../styles/BookList.css';

function BookList({ books, loading, error, onSelectBook, onAddToCart }) {
    if (loading) return <p>Loading books...</p>;
    if (error) return <p>{error}</p>;
    if (books.length === 0) return <p>No books available.</p>;

    return (
        <div className="book-list">
            {books.map((book) => (
                <div key={book.id} className="book-card">
                    {book.imageUrl && (
                        <img
                            src={book.imageUrl}
                            alt={book.title}
                            className="book-image"
                            onClick={() => onSelectBook(book)}
                        />
                    )}
                    <div className="book-info" onClick={() => onSelectBook(book)}>
                        <h2 className="book-title">{book.title}</h2>
                        <p className="book-author">av {book.author}</p>
                        <p className="book-format-language">{book.format}, {book.language}</p>
                        <p className="book-description">
                            {book.description?.substring(0, 300)}
                            {book.description?.length > 300 && '…'}
                        </p>
                        <p className="book-price">Price: ${book.price.toFixed(2)}</p>
                    </div>
                    <button
                        className="add-to-cart-button"
                        onClick={(e) => {
                            e.stopPropagation();
                            onAddToCart(book);
                        }}
                    >
                        Add to Cart
                    </button>
                </div>
            ))}
        </div>
    );
}

export default BookList;