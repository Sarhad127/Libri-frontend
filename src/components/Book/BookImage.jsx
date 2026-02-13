import '../../styles/BookDetails.css';

function BookImage({ book, onClick, className = '', imgClassName = '' }) {

    return (
        <div className={`book-image-wrapper ${className}`} onClick={onClick}>
            <div className="book-image-inner">
                {book.imageUrl && (
                    <img
                        src={book.imageUrl}
                        alt={book.title}
                        className={`book-image ${imgClassName}`}
                    />
                )}
            </div>
        </div>
    );
}

export default BookImage;