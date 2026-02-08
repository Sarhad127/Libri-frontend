// MainContent.jsx
import { useEffect, useState } from 'react';
import UserProfile from './UserProfile';
import Register from './Register';
import BookDetails from './BookDetails';
import BookList from './BookList';
import '../styles/MainContent.css';
import { fetchBooks } from "../services/api.js";

function MainContent({ user, showUserPage, showRegisterPage }) {
    const [books, setBooks] = useState([]);
    const [selectedBook, setSelectedBook] = useState(null);
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
            ) : selectedBook ? (
                <BookDetails book={selectedBook} onBack={() => setSelectedBook(null)} />
            ) : (
                <BookList
                    books={books}
                    loading={loading}
                    error={error}
                    onSelectBook={setSelectedBook}
                />
            )}
        </div>
    );
}

export default MainContent;