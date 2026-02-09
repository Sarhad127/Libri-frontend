import SortDropdown from "./SortDropdown.jsx";
import UserProfile from './UserProfile';
import Register from './Register';
import BookList from './BookList';
import BookDetails from './BookDetails';
import Cart from './Cart';
import '../styles/MainContent.css';

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
                         setSelectedBook
                     }) {

    const sortedBooks = [...books].sort((a, b) => {
        switch (sortOption) {
            case 'title': return a.title.localeCompare(b.title);
            case 'author': return a.author.localeCompare(b.author);
            case 'reviews': return (b.reviewCount || 0) - (a.reviewCount || 0);
            case 'latest': return new Date(b.publishedDate) - new Date(a.publishedDate);
            case 'oldest': return new Date(a.publishedDate) - new Date(b.publishedDate);
            case 'price-low': return a.price - b.price;
            case 'popular':
            default: return (b.popularity || 0) - (a.popularity || 0);
        }
    });

    return (
        <div className="main-content">

            {page === 'user' && user && <UserProfile
                user={user}
                onAddToCart={onAddToCart}
                favoriteIds={favoriteIds}
                onToggleFavorite={onToggleFavorite}
            />}

            {page === 'register' && <Register />}

            {page === 'cart' && <Cart
                cartItems={cartItems}
                onRemoveItem={onRemoveItem}
                onUpdateQuantity={onUpdateQuantity}
            />}

            {page === 'home' && !selectedBook && (
                <>
                    <SortDropdown sortOption={sortOption} onSortChange={setSortOption} />
                    <BookList
                        books={sortedBooks}
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