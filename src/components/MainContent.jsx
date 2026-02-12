import SortDropdown from "./SortDropdown.jsx";
import UserProfile from './UserProfile';
import Register from './Register';
import BookList from './BookList';
import BookDetails from './BookDetails';
import Cart from './Cart';
import '../styles/MainContent.css';
import Checkout from "./Checkout/Checkout.jsx";
import LoginForm from './LoginForm.jsx';

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
                         onLoginSuccess
                     }) {

    return (
        <div className="main-content">

            {page === 'user' && user && <UserProfile
                user={user}
                onAddToCart={onAddToCart}
                favoriteIds={favoriteIds}
                onToggleFavorite={onToggleFavorite}
            />}

            {page === 'register' && <Register />}

            {page === 'login' && (
                <LoginForm
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
                    onBack={() => setPage('cart')}
                    onConfirmOrder={onConfirmOrder}
                    onRemoveItem={onRemoveItem}
                />
            )}

            {page === 'home' && !selectedBook && (
                <>
                    <SortDropdown sortOption={sortOption} onSortChange={setSortOption} />
                    <BookList
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