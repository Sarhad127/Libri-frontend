import { useEffect, useState } from 'react';
import UserProfile from './UserProfile';
import Register from './Register';
import BookDetails from './BookDetails';
import BookList from './BookList';
import Cart from './Cart';
import '../styles/MainContent.css';
import { fetchBooks } from "../services/api.js";
import SortDropdown from "./SortDropdown.jsx";

function MainContent({ user, page, cartItems, onAddToCart, onRemoveItem }) {
    const [books, setBooks] = useState([]);
    const [selectedBook, setSelectedBook] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [sortOption, setSortOption] = useState('popular');

    const sortedBooks = [...books].sort((a, b) => {
        switch (sortOption) {
            case 'title':
                return a.title.localeCompare(b.title);
            case 'author':
                return a.author.localeCompare(b.author);
            case 'reviews':
                return (b.reviewCount || 0) - (a.reviewCount || 0);
            case 'latest':
                return new Date(b.publishedDate) - new Date(a.publishedDate);
            case 'oldest':
                return new Date(a.publishedDate) - new Date(b.publishedDate);
            case 'price-low':
                return a.price - b.price;
            case 'popular':
            default:
                return (b.popularity || 0) - (a.popularity || 0);
        }
    });

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
                <>
                    <SortDropdown
                        sortOption={sortOption}
                        onSortChange={setSortOption}
                    />

                    <BookList
                        books={sortedBooks}
                        loading={loading}
                        error={error}
                        onSelectBook={setSelectedBook}
                        onAddToCart={onAddToCart}
                    />
                </>
            )}
            {page === 'home' && selectedBook && (
                <BookDetails book={selectedBook} onBack={() => setSelectedBook(null)} />
            )}
        </div>
    );
}

export default MainContent;