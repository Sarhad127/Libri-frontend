import {useCallback, useEffect, useMemo, useState} from 'react';
import Home from './components/Home.jsx';
import './App.css';
import {
    addToCart, fetchCart, removeCartItem, fetchBooks, fetchFavorites, addFavorite, removeFavorite,
    fetchMostPopularRecent, fetchTopRatedBooks, fetchMostPopularBooks, createOrder
} from "./services/api.js";

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
    const [baseBooks, setBaseBooks] = useState(allBooks);

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

    useEffect(() => {
        setBaseBooks(allBooks);
    }, [allBooks]);

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
            setBaseBooks(allBooks);
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
        setBaseBooks(filtered);
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

    const [sidebarFilters, setSidebarFilters] = useState({
        languages: [],
        categories: [],
        formats: []
    });

    const applySidebarFilters = useCallback((books) => {
        return books.filter(book =>
            (sidebarFilters.languages.length === 0 || sidebarFilters.languages.includes(book.language)) &&
            (sidebarFilters.categories.length === 0 || sidebarFilters.categories.includes(book.category)) &&
            (sidebarFilters.formats.length === 0 || sidebarFilters.formats.includes(book.format))
        );
    }, [sidebarFilters]);

    const sortedBooks = useMemo(() => {
        const filtered = applySidebarFilters(baseBooks);

        return [...filtered].sort((a, b) => {
            switch (sortOption) {
                case 'title':
                    return a.title.localeCompare(b.title);
                case 'author':
                    return (a.author || '').localeCompare(b.author || '');
                case 'reviews':
                    return (b.reviewCount || 0) - (a.reviewCount || 0);
                case 'latest':
                    return new Date(b.createdAt) - new Date(a.createdAt);
                case 'oldest':
                    return new Date(a.createdAt) - new Date(b.createdAt);
                case 'price-low':
                    return a.price - b.price;
                case 'price-high':
                    return b.price - a.price;
                case 'popular':
                default:
                    return (b.popularity || 0) - (a.popularity || 0);
            }
        });
    }, [baseBooks, sortOption, applySidebarFilters]);

    const handleFilter = async (filter) => {
        let fetchedBooks;

        try {
            switch (filter) {
                case "Most Popular":
                    fetchedBooks = await fetchMostPopularRecent(7, 10);
                    break;
                case "Top Rated":
                    fetchedBooks = await fetchTopRatedBooks(10);
                    break;
                case "Bestsellers":
                    fetchedBooks = await fetchMostPopularBooks(10);
                    break;
                case "All Books":
                default:
                    fetchedBooks = allBooks;
            }
        } catch {
            fetchedBooks = allBooks;
        }

        setBaseBooks(fetchedBooks);
        setPage("home");
    };

    const handleSidebarFilters = (newFilters) => setSidebarFilters(newFilters);

    const handleSortChange = (newSort) => setSortOption(newSort);

    const handleConfirmOrder = async (shippingMethod) => {
        if (!token) return alert("Please log in.");

        try {
            await createOrder(token, cartItems, shippingMethod);

            setCartItems([]);
            setPage('home');
            alert("Order placed successfully!");
        } catch (err) {
            console.error(err);
            alert("Failed to place order.");
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
                setSortOption={handleSortChange}
                favoriteIds={favoriteIds}
                onToggleFavorite={toggleFavorite}
                selectedBook={selectedBook}
                setSelectedBook={setSelectedBook}
                onSearch={handleSearch}
                baseBooks={baseBooks}
                sortedBooks={sortedBooks}
                sidebarFilters={sidebarFilters}
                onSidebarFilterChange={handleSidebarFilters}
                onFilter={handleFilter}
                onConfirmOrder={handleConfirmOrder}
            />
        </div>
    );
}

export default App;