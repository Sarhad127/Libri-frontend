import { useState } from 'react';
import UserProfile from './UserProfile';
import Register from './Register';
import BookDetails from './BookDetails';
import BookList from './BookList';
import Cart from './Cart';
import '../styles/MainContent.css';

function MainContent({
                         user,
                         page,
                         cartItems,
                         onAddToCart,
                         onRemoveItem,
                         books = []
                     }) {

    const [selectedBook, setSelectedBook] = useState(null);

    return (
        <div className="main-content">
            {page === 'user' && user && <UserProfile user={user} />}
            {page === 'register' && <Register />}
            {page === 'cart' && <Cart cartItems={cartItems} onRemoveItem={onRemoveItem} />}

            {page === 'home' && !selectedBook && (
                <BookList
                    books={books}
                    onSelectBook={setSelectedBook}
                    onAddToCart={onAddToCart}
                />
            )}

            {page === 'home' && selectedBook && (
                <BookDetails book={selectedBook} onBack={() => setSelectedBook(null)} />
            )}
        </div>
    );
}

export default MainContent;