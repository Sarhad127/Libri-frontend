import { useEffect, useState, useCallback } from "react";
import Sidebar from "./Sidebar";
import MainContent from "./MainContent";
import TopBar from "./TopBar";
import SubTopBar from "./SubTopBar.jsx";
import '../styles/Home.css';
import { fetchMostPopularBooks, fetchMostPopularRecent, fetchTopRatedBooks } from "../services/api.js";

function Home({
                  user,
                  page,
                  setPage,
                  cartItems,
                  onAddToCart,
                  onRemoveFromCart,
                  onUpdateQuantity,
                  onLoginSuccess,
                  onLogout,
                  goToCart,
                  allBooks,
                  displayBooks,
                  setDisplayBooks,
                  sortOption,
                  setSortOption,
                  favoriteIds,
                  onToggleFavorite,
                  selectedBook,
                  setSelectedBook,
                  onSearch
              }) {

    const [baseBooks, setBaseBooks] = useState(allBooks);

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

    const updateDisplayBooks = (books) => {
        const filtered = applySidebarFilters(books);

        const sorted = [...filtered].sort((a, b) => {
            switch (sortOption) {
                case 'title': return a.title.localeCompare(b.title);
                case 'author': return a.author.localeCompare(b.author);
                case 'reviews': return (b.reviewCount || 0) - (a.reviewCount || 0);
                case 'latest': return new Date(b.publishedDate) - new Date(a.publishedDate);
                case 'oldest': return new Date(a.publishedDate) - new Date(b.publishedDate);
                case 'price-low': return a.price - b.price;
                case 'price-high': return b.price - a.price;
                default: return 0;
            }
        });

        return sorted;
    };

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
        setDisplayBooks(updateDisplayBooks(fetchedBooks));
        setPage("home");
    };

    const handleSidebarFilters = (newFilters) => {
        setSidebarFilters(newFilters);
        setDisplayBooks(updateDisplayBooks(baseBooks));
    };

    const handleSortChange = (newSort) => {
        setSortOption(newSort);
        setDisplayBooks(updateDisplayBooks(baseBooks));
    };

    useEffect(() => {
        setBaseBooks(allBooks);
    }, [allBooks]);

    useEffect(() => {
        setDisplayBooks(updateDisplayBooks(baseBooks));
    }, [baseBooks, applySidebarFilters, sortOption]);

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
                onSearch={onSearch}
            />

            <div className={`content-area ${['register', 'user', 'cart'].includes(page) ? 'centered' : ''}`}>
                { !['register', 'user', 'cart'].includes(page) && (
                    <Sidebar onFilterChange={handleSidebarFilters} />
                )}

                <div className="main-column">
                    { !['register'].includes(page) && <SubTopBar onFilter={handleFilter} /> }
                    <MainContent
                        user={user}
                        page={page}
                        cartItems={cartItems}
                        onAddToCart={onAddToCart}
                        onRemoveItem={onRemoveFromCart}
                        setPage={setPage}
                        books={displayBooks}
                        sortOption={sortOption}
                        setSortOption={handleSortChange}
                        onUpdateQuantity={onUpdateQuantity}
                        favoriteIds={favoriteIds}
                        onToggleFavorite={onToggleFavorite}
                        selectedBook={selectedBook}
                        setSelectedBook={setSelectedBook}
                        onSortChange={handleSortChange}
                    />
                </div>
            </div>
        </div>
    );
}

export default Home;