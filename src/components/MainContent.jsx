import { useEffect, useState } from 'react';
import UserProfile from './UserProfile';
import Register from './Register';
import BookDetails from './BookDetails';
import BookList from './BookList';
import Cart from './Cart';
import '../styles/MainContent.css';
import { fetchBooks } from "../services/api.js";

function MainContent({ user, page, cartItems, onAddToCart, onRemoveItem }) {
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
            {page === 'user' && user && <UserProfile user={user} />}
            {page === 'register' && <Register />}
            {page === 'cart' && <Cart cartItems={cartItems} onRemoveItem={onRemoveItem} />}
            {page === 'home' && !selectedBook && (
                <BookList
                    books={books}
                    loading={loading}
                    error={error}
                    onSelectBook={setSelectedBook}
                    onAddToCart={onAddToCart}
                />
            )}
            {selectedBook && (
                <BookDetails book={selectedBook} onBack={() => setSelectedBook(null)} />
            )}
        </div>
    );
}

export default MainContent;