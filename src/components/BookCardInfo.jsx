import AddToCartButton from "./AddToCartButton.jsx";
import FavoriteButton from "./FavoriteButton.jsx";

function BookCardInfo({ book, favoriteIds, onToggleFavorite, onAddToCart }) {
    return (
        <div className="book-info">
            <div className="title-favorite-wrapper">
                <h2 className="book-title">{book.title}</h2>
                <FavoriteButton
                    isFavorite={favoriteIds.includes(book.id)}
                    onToggle={() => onToggleFavorite(book.id)}
                />
            </div>
            <p className="book-author">av {book.author}</p>
            <p className="book-format-language">
                {book.format}, {book.language}
            </p>
            <p className="book-description">
                {book.description?.substring(0, 300)}
                {book.description?.length > 300 && '…'}
            </p>
            <p className="book-price">
                Price: ${book.price?.toFixed(2)}
            </p>
            <AddToCartButton book={book} onAddToCart={onAddToCart} />
        </div>
    );
}

export default BookCardInfo;
