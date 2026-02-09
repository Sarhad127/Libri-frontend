import { useState, useEffect } from "react";
import Sidebar from "./Sidebar";
import MainContent from "./MainContent";
import TopBar from "./TopBar";
import '../styles/Home.css';
import { fetchBooks } from "../services/api.js";

function Home({
                  user,
                  onLoginSuccess,
                  page,
                  setPage,
                  goToCart,
                  cartItems,
                  onAddToCart,
                  onRemoveFromCart,
                  onLogout,
              }) {

    const [allBooks, setAllBooks] = useState([]);
    const [displayBooks, setDisplayBooks] = useState([]);
    const [sortOption, setSortOption] = useState('popular');

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

    return (
        <div className="home-layout">
            <TopBar
                user={user}
                onLoginSuccess={onLoginSuccess}
                onUserPage={() => setPage('user')}
                goToRegister={() => setPage('register')}
                onLogout={onLogout}
                goToCart={goToCart}
                page={page}
                cartItems={cartItems}
                onSearch={handleSearch}
            />
            <div className="content-area">
                <Sidebar
                    goHome={() => setPage('home')}
                    books={allBooks}
                    onBooksChange={setDisplayBooks}
                />
                <MainContent
                    user={user}
                    page={page}
                    cartItems={cartItems}
                    onAddToCart={onAddToCart}
                    onRemoveItem={onRemoveFromCart}
                    setPage={setPage}
                    books={displayBooks}
                    sortOption={sortOption}
                    setSortOption={setSortOption}
                />
            </div>
        </div>
    );
}

export default Home;