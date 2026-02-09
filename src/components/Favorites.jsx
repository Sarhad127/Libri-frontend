import React, { useEffect, useState } from 'react';
import { fetchFavorites } from '../services/api.js';
import BookDetails from './BookDetails.jsx';
import BookImage from './BookImage.jsx';
import '../styles/Favorites.css';

function Favorites() {
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
        return <BookDetails book={selectedBook} onBack={() => setSelectedBook(null)} />;
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

                    <div className="book-info">
                        <h2 className="book-title">{book.title}</h2>
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
                    </div>
                </div>
            ))}
        </div>
    );
}

export default Favorites;