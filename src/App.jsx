import { useEffect, useState } from 'react';
import Home from './components/Home.jsx';
import './App.css';
import { addToCart, fetchCart, removeCartItem, fetchBooks, fetchFavorites, addFavorite, removeFavorite } from "./services/api.js";

function App() {
    const token = localStorage.getItem('token');
    const [user, setUser] = useState(null);
    const [cartItems, setCartItems] = useState([]);
    const [page, setPage] = useState('home');
    const [allBooks, setAllBooks] = useState([]);
    const [displayBooks, setDisplayBooks] = useState([]);
    const [sortOption, setSortOption] = useState('popular');
    const [favoriteIds, setFavoriteIds] = useState([]);
    const [selectedBook, setSelectedBook] = useState(null);

    useEffect(() => {
        const savedUser = JSON.parse(localStorage.getItem('user'));
        if (token && savedUser) {
            setUser(savedUser);
            fetchCart(token)
                .then(cart => setCartItems(cart))
                .catch(err => console.error('Failed to load cart:', err));
        }
    }, [token]);

    useEffect(() => {
        const loadBooks = async () => {
            try {
                const books = await fetchBooks();
                setAllBooks(books);
                setDisplayBooks(books);
            } catch (err) {
                console.error("Failed to fetch books:", err);
            }
        };
        loadBooks();
    }, []);

    useEffect(() => {
        const loadFavorites = async () => {
            if (!token) return;
            try {
                const favorites = await fetchFavorites(token);
                setFavoriteIds(favorites.map(fav => fav.id));
            } catch (err) {
                console.error('Failed to fetch favorites', err);
            }
        };
        loadFavorites();
    }, [token]);

    const handleLoginSuccess = async (userData) => {
        setUser(userData);
        setPage('home');

        try {
            const savedCart = await fetchCart(userData.token);
            setCartItems(savedCart);
        } catch (err) {
            console.error('Failed to load cart on login:', err);
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setUser(null);
        setCartItems([]);
        setPage('home');
    };

    const goToCart = async () => {
        try {
            const items = await fetchCart(token);
            setCartItems(items);
            setPage('cart');
        } catch (err) {
            console.error('Failed to load cart:', err);
        }
    };

    const handleAddToCart = async (book) => {
        if (!token || !user) return;
        try {
            await addToCart(token, book.id, 1);
            const updatedCart = await fetchCart(token);
            setCartItems(updatedCart);
        } catch (err) {
            console.error('Failed to add to cart', err);
        }
    };

    const handleRemoveFromCart = async (cartItemId) => {
        setCartItems(prev => prev.filter(item => item.id !== cartItemId));
        if (token && user) {
            try {
                await removeCartItem(token, cartItemId);
            } catch (err) {
                console.error('Failed to remove item from backend cart', err);
            }
        }
    };

    const handleUpdateQuantity = (cartItemId, newQuantity) => {
        if (newQuantity < 1) return;
        setCartItems(prev =>
            prev.map(item =>
                item.id === cartItemId ? { ...item, quantity: newQuantity } : item
            )
        );
    };

    const handleSearch = (query) => {
        if (!query) {
            setDisplayBooks(allBooks);
            return;
        }
        const lower = query.toLowerCase();
        const filtered = allBooks.filter(book =>
            book.title?.toLowerCase().includes(lower) ||
            book.author?.toLowerCase().includes(lower) ||
            book.category?.toLowerCase().includes(lower) ||
            book.language?.toLowerCase().includes(lower) ||
            book.format?.toLowerCase().includes(lower) ||
            book.description?.toLowerCase().includes(lower)
        );
        setDisplayBooks(filtered);
        setPage('home');
    };

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

    return (
        <div className="app-container">
            <Home
                user={user}
                onLoginSuccess={handleLoginSuccess}
                onUserPage={() => setPage('user')}
                onRegisterPage={() => setPage('register')}
                onLogout={handleLogout}
                goToCart={goToCart}
                cartItems={cartItems}
                onAddToCart={handleAddToCart}
                onRemoveFromCart={handleRemoveFromCart}
                onUpdateQuantity={handleUpdateQuantity}
                page={page}
                setPage={setPage}
                allBooks={allBooks}
                displayBooks={displayBooks}
                setDisplayBooks={setDisplayBooks}
                sortOption={sortOption}
                setSortOption={setSortOption}
                favoriteIds={favoriteIds}
                onToggleFavorite={toggleFavorite}
                selectedBook={selectedBook}
                setSelectedBook={setSelectedBook}
                onSearch={handleSearch}
            />
        </div>
    );
}

export default App;