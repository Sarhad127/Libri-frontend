import { useState } from 'react';
import Home from './components/Home.jsx';
import './App.css';

import { useCart } from "./hooks/useCart.js";
import { useUser } from './hooks/useUser.js';
import { useFavorites } from './hooks/useFavorites.js';
import { useBooks } from './hooks/useBooks.js';
import { useBookFilters } from './hooks/useBookFilters.js';

function App() {
    const token = localStorage.getItem('token');
    const [user, setUser] = useState(null);
    const [page, setPage] = useState('home');
    const [selectedBook, setSelectedBook] = useState(null);

    const { allBooks } = useBooks();
    const { favoriteIds, toggleFavorite } = useFavorites(token, user);
    const { handleLoginSuccess, handleLogout } = useUser(token, setUser, setPage);
    const {
        cartItems,
        goToCart,
        handleAddToCart,
        handleRemoveFromCart,
        handleUpdateQuantity,
        handleConfirmOrder
    } = useCart(token, user, setPage);

    const {
        baseBooks,
        sortedBooks,
        sidebarFilters,
        sortOption,
        searchQuery,
        handleFilter,
        handleSidebarFilters,
        handleSortChange,
        handleSearch
    } = useBookFilters(allBooks, setPage);

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
                sortedBooks={sortedBooks}
                baseBooks={baseBooks}
                searchQuery={searchQuery}
                sortOption={sortOption}
                setSortOption={handleSortChange}
                favoriteIds={favoriteIds}
                onToggleFavorite={toggleFavorite}
                selectedBook={selectedBook}
                setSelectedBook={setSelectedBook}
                onSearch={handleSearch}
                sidebarFilters={sidebarFilters}
                onSidebarFilterChange={handleSidebarFilters}
                onFilter={handleFilter}
                onConfirmOrder={handleConfirmOrder}
            />
        </div>
    );
}

export default App;