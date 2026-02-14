import '../../styles/BookList.css';
import BookImage from './BookImage.jsx';
import BookCardInfo from "./BookCardInfo.jsx";
import React from "react";

function BookList({ books = [], loading, error, onSelectBook, onAddToCart, favoriteIds, onToggleFavorite }) {
    if (loading) return <p>Loading books...</p>;
    if (error) return <p>{error}</p>;
    if (books.length === 0) return <p>No books available.</p>;

    return (
        <div className="book-list">
            {books.map(book => (
                <div
                    key={book.id}
                    className="book-card"
                    onClick={() => onSelectBook(book)}
                >
                    <BookImage
                        book={book}
                        className="book-list-image"
                        heartClassName="book-list-heart"
                        imgClassName="book-list-image"
                    />

                    <BookCardInfo
                        book={book}
                        favoriteIds={favoriteIds}
                        onToggleFavorite={onToggleFavorite}
                        onAddToCart={onAddToCart}
                    />
                </div>
            ))}
        </div>
    );
}

export default BookList;