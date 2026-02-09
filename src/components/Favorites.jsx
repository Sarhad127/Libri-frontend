import React, { useEffect, useState } from 'react';
import { fetchFavorites } from '../services/api.js';
import BookDetails from './BookDetails.jsx';
import BookImage from './BookImage.jsx';
import '../styles/Favorites.css';
import BookCardInfo from "./BookCardInfo.jsx";

function Favorites({ onAddToCart, onToggleFavorite, favoriteIds }) {
    const [favorites, setFavorites] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [selectedBook, setSelectedBook] = useState(null);
    const token = localStorage.getItem('token');

    useEffect(() => {
        const loadFavorites = async () => {
            if (!token) return;

            setLoading(true);
            setError(null);
            try {
                const data = await fetchFavorites(token);
                setFavorites(data);
            } catch (err) {
                console.error(err);
                setError('Failed to load favorites.');
            } finally {
                setLoading(false);
            }
        };

        loadFavorites();
    }, [token]);

    if (loading) return <p>Loading favorites...</p>;
    if (error) return <p>{error}</p>;
    if (!favorites || favorites.length === 0) return <p>No favorites yet.</p>;

    if (selectedBook) {
        return <BookDetails
            book={selectedBook}
            onBack={() => setSelectedBook(null)}
            onAddToCart={onAddToCart}
            isFavorite={favoriteIds.includes(selectedBook.id)}
            onToggleFavorite={onToggleFavorite}/>;
    }

    return (
        <div className="favorites-list">
            {favorites.map((book) => (
                <div
                    key={book.id}
                    className="favorites-card"
                    onClick={() => setSelectedBook(book)}
                >
                    <BookImage
                        book={book}
                        token={token}
                        className="favorites-image-wrapper"
                        imgClassName="favorites-image"
                        heartClassName="favorites-heart"
                        onClick={() => setSelectedBook(book)}
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

export default Favorites;