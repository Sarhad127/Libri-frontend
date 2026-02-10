import Sidebar from "./Sidebar";
import MainContent from "./MainContent";
import TopBar from "./TopBar";
import '../styles/Home.css';
import SubTopBar from "./SubTopBar.jsx";
import {fetchMostPopularBooks, fetchMostPopularRecent, fetchTopRatedBooks} from "../services/api.js";
import { useEffect, useState, useCallback } from "react";

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
        setDisplayBooks(applySidebarFilters(fetchedBooks));
        setPage("home");
    };


    const applySidebarFilters = useCallback((books) => {
        return books.filter(book =>
            (sidebarFilters.languages.length === 0 ||
                sidebarFilters.languages.includes(book.language)) &&

            (sidebarFilters.categories.length === 0 ||
                sidebarFilters.categories.includes(book.category)) &&

            (sidebarFilters.formats.length === 0 ||
                sidebarFilters.formats.includes(book.format))
        );
    }, [sidebarFilters]);

    useEffect(() => {
        setBaseBooks(allBooks);
    }, [allBooks]);

    useEffect(() => {
        setDisplayBooks(applySidebarFilters(baseBooks));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [baseBooks, applySidebarFilters]);

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
                    <Sidebar onFilterChange={setSidebarFilters} />
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
                        setSortOption={setSortOption}
                        onUpdateQuantity={onUpdateQuantity}
                        favoriteIds={favoriteIds}
                        onToggleFavorite={onToggleFavorite}
                        selectedBook={selectedBook}
                        setSelectedBook={setSelectedBook}
                    />
                </div>
            </div>
        </div>
    );
}

export default Home;