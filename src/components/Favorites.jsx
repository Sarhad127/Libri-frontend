import React, { useEffect, useState } from 'react';
import { fetchFavorites } from '../services/api.js';
import '../styles/BookList.css';

function Favorites() {
    const [favorites, setFavorites] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const loadFavorites = async () => {
            const token = localStorage.getItem('token');
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
    }, []);

    if (loading) return <p>Loading favorites...</p>;
    if (error) return <p>{error}</p>;
    if (!favorites || favorites.length === 0) return <p>No favorites yet.</p>;

    return (
        <div className="book-list">
            {favorites.map((book) => (
                <div key={book.id} className="book-card">
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

export default Favorites;