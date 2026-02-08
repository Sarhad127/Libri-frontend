import { useState, useEffect } from 'react';
import { addFavorite, removeFavorite, fetchFavorites } from '../services/api.js';
import '../styles/BookDetails.css';
import '../styles/BookFavoriteButton.css';
function BookImage({ book, token }) {
    const [isFavorite, setIsFavorite] = useState(false);

    useEffect(() => {
        const checkFavorite = async () => {
            if (!token) return;
            try {
                const favorites = await fetchFavorites(token);
                const favoriteIds = favorites.map(fav => fav.id);
                setIsFavorite(favoriteIds.includes(book.id));
            } catch (err) {
                console.error('Failed to fetch favorites', err);
            }
        };
        checkFavorite();
    }, [book.id, token]);

    const handleFavoriteClick = async () => {
        if (!token) return alert('Please log in to add favorites.');
        try {
            if (isFavorite) {
                await removeFavorite(token, book.id);
                setIsFavorite(false);
            } else {
                await addFavorite(token, book.id);
                setIsFavorite(true);
            }
        } catch (err) {
            console.error('Failed to update favorites', err);
        }
    };

    return (
        <div className="book-image-wrapper">
            {book.imageUrl && (
                <img
                    src={book.imageUrl}
                    alt={book.title}
                    className="book-details-image"
                />
            )}
            <button
                className={`favorite-heart ${isFavorite ? 'favorited' : ''}`}
                onClick={handleFavoriteClick}
            >
                ♥
            </button>
        </div>
    );
}

export default BookImage;