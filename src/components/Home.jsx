import Sidebar from "./Sidebar";
import MainContent from "./MainContent";
import TopBar from "./TopBar";
import '../styles/Home.css';
import SubTopBar from "./SubTopBar.jsx";

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

    const handleFilter = (filter) => {
        switch (filter) {
            case "Most Popular":
                setDisplayBooks([...allBooks].sort((a, b) => (b.popularity || 0) - (a.popularity || 0)));
                break;
            case "New Arrivals":
                setDisplayBooks([...allBooks].sort((a, b) => new Date(b.publishedDate) - new Date(a.publishedDate)));
                break;
            case "Top Rated":
                setDisplayBooks([...allBooks].sort((a, b) => (b.rating || 0) - (a.rating || 0)));
                break;
            case "Bestsellers":
                setDisplayBooks([...allBooks].sort((a, b) => (b.sales || 0) - (a.sales || 0)));
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