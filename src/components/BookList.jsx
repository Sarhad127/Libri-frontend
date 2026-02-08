import '../styles/BookList.css';

function BookList({ books, loading, error, onSelectBook }) {
    if (loading) return <p>Loading books...</p>;
    if (error) return <p>{error}</p>;
    if (books.length === 0) return <p>No books available.</p>;

    return (
        <div className="book-list">
            {books.map((book) => (
                <div
                    key={book.id}
                    className="book-card"
                    onClick={() => onSelectBook(book)}
                >
                    {book.imageUrl && <img src={book.imageUrl} alt={book.title} className="book-image" />}
                    <div className="book-info">
                        <h2 className="book-title">{book.title}</h2>
                        <p className="book-author">av {book.author}</p>
                        <p className="book-format-language">{book.format}, {book.language}</p>
                        <p className="book-description">
                            {book.description?.substring(0, 300)}
                            {book.description?.length > 300 && '…'}
                        </p>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default BookList;