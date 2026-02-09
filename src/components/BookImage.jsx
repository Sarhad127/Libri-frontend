import { useState, useEffect } from 'react';
import { addFavorite, removeFavorite, fetchFavorites } from '../services/api.js';
import '../styles/BookDetails.css';

function BookImage({ book, token, onClick, className = '', heartClassName = '' }) {
    const [isFavorite, setIsFavorite] = useState(false);

    useEffect(() => {
        const checkFavorite = async () => {
            if (!token) return;
            try {
                const favorites = await fetchFavorites(token);
                setIsFavorite(favorites.some(fav => fav.id === book.id));
            } catch (err) {
                console.error('Failed to fetch favorites', err);
            }
        };
        checkFavorite();
    }, [book.id, token]);

    const handleFavoriteClick = async (e) => {
        e.stopPropagation();

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
        <div className={`book-image-wrapper ${className}`} onClick={onClick}>
            <div className="book-image-inner" style={{ position: 'relative', display: 'inline-block' }}>
                {book.imageUrl && (
                    <img
                        src={book.imageUrl}
                        alt={book.title}
                        className="book-image"
                    />
                )}

                <button
                    className={`favorite-heart ${isFavorite ? 'favorited' : ''} ${heartClassName}`}
                    onClick={handleFavoriteClick}
                    style={{ position: 'absolute', bottom: '10px', right: '10px' }}
                >
                    ♥
                </button>
            </div>
        </div>
    );
}

export default BookImage;
