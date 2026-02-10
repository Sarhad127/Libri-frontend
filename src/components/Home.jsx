import Sidebar from "./Sidebar";
import MainContent from "./MainContent";
import TopBar from "./TopBar";
import '../styles/Home.css';

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

            <div className={`content-area ${page === 'register' ? 'centered' : ''}`}>
                {page !== 'register' && (
                    <Sidebar
                        goHome={() => setPage('home')}
                        books={allBooks}
                        onBooksChange={setDisplayBooks}
                    />
                )}

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
    );
}

export default Home;