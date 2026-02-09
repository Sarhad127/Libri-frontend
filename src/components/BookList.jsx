import '../styles/BookList.css';
import BookImage from './BookImage';
import {addFavorite, fetchFavorites, removeFavorite} from "../services/api.js";
import { useEffect, useState } from "react";
import FavoriteButton from "./FavoriteButton.jsx";

function BookList({ books = [], loading, error, onSelectBook, onAddToCart }) {
    const token = localStorage.getItem('token');
    const [favoriteIds, setFavoriteIds] = useState([]);

    useEffect(() => {
        const checkFavorites = async () => {
            if (!token) return;
            try {
                const favorites = await fetchFavorites(token);
                setFavoriteIds(favorites.map(fav => fav.id));
            } catch (err) {
                console.error('Failed to fetch favorites', err);
            }
        };
        checkFavorites();
    }, [token]);

    const toggleFavorite = async (bookId) => {
        if (!token) return alert('Please log in.');
        try {
            if (favoriteIds.includes(bookId)) {
                await removeFavorite(token, bookId);
                setFavoriteIds(prev => prev.filter(id => id !== bookId));
            } else {
                await addFavorite(token, bookId);
                setFavoriteIds(prev => [...prev, bookId]);
            }
        } catch (err) {
            console.error(err);
        }
    };

    if (loading) return <p>Loading books...</p>;
    if (error) return <p>{error}</p>;
    if (books.length === 0) return <p>No books available.</p>;

    return (
        <div className="book-list">
            {books.map(book => {
                favoriteIds.includes(book.id);
                return (
                    <div key={book.id} className="book-card" style={{ position: 'relative' }}>
                        <BookImage
                            book={book}
                            token={token}
                            onClick={() => onSelectBook(book)}
                            className="book-list-image"
                            heartClassName="book-list-heart"
                            imgClassName="book-list-image"
                        />

                        <div className="book-info" onClick={() => onSelectBook(book)}>
                            <div className="title-favorite-wrapper">
                                <h2 className="book-title">{book.title}</h2>
                                <FavoriteButton
                                    isFavorite={favoriteIds.includes(book.id)}
                                    onToggle={() => toggleFavorite(book.id)}
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
                                Price: ${book.price.toFixed(2)}
                            </p>
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
                    </div>
                );
            })}
        </div>
    );
}

export default BookList;