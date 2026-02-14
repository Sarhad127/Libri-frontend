import SortDropdown from "./SortDropdown.jsx";
import UserProfile from './UserProfile/UserProfile.jsx';
import Register from './Authentication/Register.jsx';
import BookList from './Book/BookList.jsx';
import BookDetails from './Book/BookDetails.jsx';
import Cart from './Cart';
import '../styles/MainContent.css';
import Checkout from "./Checkout/Checkout.jsx";
import Login from './Authentication/Login.jsx';
import PaginatedBookList from "./Book/PaginatedBookList.jsx";

function MainContent({
                         user,
                         page,
                         cartItems,
                         onAddToCart,
                         onRemoveItem,
                         books = [],
                         sortOption,
                         setSortOption,
                         onUpdateQuantity,
                         favoriteIds,
                         onToggleFavorite,
                         selectedBook,
                         setSelectedBook,
                         setPage,
                         onConfirmOrder,
                         onLoginSuccess,
                         onBooksUpdated
                     }) {

    return (
        <div className="main-content">

            {page === 'user' && user && <UserProfile
                user={user}
                onAddToCart={onAddToCart}
                favoriteIds={favoriteIds}
                onToggleFavorite={onToggleFavorite}
                onBooksUpdated={onBooksUpdated}
            />}

            {page === 'register' && (
                <Register
                    goToLogin={() => setPage('login')}
                />
            )}

            {page === 'login' && (
                <Login
                    onLoginSuccess={onLoginSuccess}
                    goToRegister={() => setPage('register')}
                />
            )}

            {page === 'cart' && <Cart
                cartItems={cartItems}
                onRemoveItem={onRemoveItem}
                onUpdateQuantity={onUpdateQuantity}
                onCheckout={() => setPage('checkout')}
            />}

            {page === 'checkout' && (
                <Checkout
                    user={user}
                    cartItems={cartItems}
                    onBack={() => setPage('home')}
                    onConfirmOrder={onConfirmOrder}
                    onRemoveItem={onRemoveItem}
                />
            )}

            {page === 'home' && !selectedBook && (
                <>
                    <SortDropdown sortOption={sortOption} onSortChange={setSortOption} />
                    <PaginatedBookList
                        books={books}
                        onSelectBook={setSelectedBook}
                        onAddToCart={onAddToCart}
                        favoriteIds={favoriteIds}
                        onToggleFavorite={onToggleFavorite}
                    />
                </>
            )}

            {page === 'home' && selectedBook && (
                <BookDetails
                    book={selectedBook}
                    onBack={() => setSelectedBook(null)}
                    onAddToCart={onAddToCart}
                    isFavorite={favoriteIds.includes(selectedBook.id)}
                    onToggleFavorite={onToggleFavorite}
                />
            )}

        </div>
    );
}

export default MainContent;