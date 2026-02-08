import { useEffect, useState } from 'react';
import UserProfile from './UserProfile';
import Register from './Register';
import '../styles/MainContent.css';
import {fetchBooks} from "../services/api.js";

function MainContent({ user, showUserPage, showRegisterPage }) {
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const loadBooks = async () => {
            setLoading(true);
            setError(null);
            try {
                const data = await fetchBooks();
                setBooks(data);
            } catch (err) {
                console.error(err);
                setError('Failed to load books.');
            } finally {
                setLoading(false);
            }
        };

        loadBooks();
    }, []);

    return (
        <div className="main-content">
            {showUserPage && user ? (
                <UserProfile user={user} />
            ) : showRegisterPage ? (
                <Register />
            ) : (
                <div className="book-list">
                    {loading && <p>Loading books...</p>}
                    {error && <p>{error}</p>}
                    {!loading && !error && books.length === 0 && <p>No books available.</p>}
                    {books.map(book => (
                        <div key={book.id} className="book-card">
                            {book.imageUrl && (
                                <img
                                    src={book.imageUrl}
                                    alt={book.title}
                                    className="book-image"
                                />
                            )}
                            <div className="book-info">
                                <h2 className="book-title">{book.title}</h2>
                                <p className="book-author">av {book.author}</p>
                                <p className="book-format-language">
                                    {book.format}, {book.language}
                                </p>
                                <p className="book-isbn"><strong>ISBN:</strong> {book.isbn}</p>
                                <p className="book-amount"><strong>Available copies:</strong> {book.amount}</p>
                                <p className="book-description">{book.description?.substring(0, 300)}{book.description?.length > 300 && '…'}</p>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default MainContent;