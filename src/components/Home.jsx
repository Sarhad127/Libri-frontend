import Sidebar from "./Sidebar";
import MainContent from "./MainContent";
import TopBar from "./TopBar";
import '../styles/Home.css';
import SubTopBar from "./SubTopBar.jsx";
import {fetchMostPopularBooks, fetchMostPopularRecent, fetchTopRatedBooks} from "../services/api.js";

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


    const handleFilter = async (filter) => {
        switch (filter) {
            case "All Books":
                setDisplayBooks(allBooks);
                break;
            case "Most Popular":
                try {
                    const popularBooks = await fetchMostPopularRecent(7, 10);
                    setDisplayBooks(popularBooks);
                } catch (error) {
                    setDisplayBooks(allBooks);
                }
                break;
            case "Top Rated":
                try {
                    const topRatedBooks = await fetchTopRatedBooks(10);
                    setDisplayBooks(topRatedBooks);
                } catch (error) {
                    setDisplayBooks(allBooks);
                }
                break;
            case "Bestsellers":
                try {
                    const popularBooks = await fetchMostPopularBooks(10);
                    setDisplayBooks(popularBooks);
                } catch (error) {
                    setDisplayBooks(allBooks);
                }
                break;
            default:
                setDisplayBooks(allBooks);
        }
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
                onSearch={onSearch}
            />

            <div className={`content-area ${['register', 'user', 'cart'].includes(page) ? 'centered' : ''}`}>
                { !['register', 'user', 'cart'].includes(page) && (
                    <Sidebar
                        books={allBooks}
                        onBooksChange={setDisplayBooks}
                    />
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