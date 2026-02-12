import Sidebar from "./Sidebar";
import MainContent from "./MainContent";
import TopBar from "./TopBar";
import SubTopBar from "./SubTopBar.jsx";
import '../styles/Home.css';
import PromoBar from "./PromoBar.jsx";

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
                  sortedBooks,
                  sidebarFilters,
                  onSidebarFilterChange,
                  onFilter,
                  sortOption,
                  setSortOption,
                  favoriteIds,
                  onToggleFavorite,
                  selectedBook,
                  setSelectedBook,
                  onSearch,
                  onConfirmOrder
              }) {

    return (
        <div className="home-layout">
            <PromoBar />
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

            <SubTopBar onFilter={onFilter} />

            <div className={`content-area ${['register', 'user', 'cart', 'checkout'].includes(page) ? 'centered' : ''}`}>
                {!['register', 'user', 'cart', 'checkout'].includes(page) && (
                    <Sidebar
                        filters={sidebarFilters}
                        onFilterChange={onSidebarFilterChange}
                    />
                )}

                <div className="main-column">
                    <MainContent
                        user={user}
                        page={page}
                        cartItems={cartItems}
                        onAddToCart={onAddToCart}
                        onRemoveItem={onRemoveFromCart}
                        setPage={setPage}
                        books={sortedBooks}
                        sortOption={sortOption}
                        setSortOption={setSortOption}
                        onUpdateQuantity={onUpdateQuantity}
                        favoriteIds={favoriteIds}
                        onToggleFavorite={onToggleFavorite}
                        selectedBook={selectedBook}
                        setSelectedBook={setSelectedBook}
                        onSortChange={setSortOption}
                        onConfirmOrder={onConfirmOrder}
                    />
                </div>
            </div>
        </div>
    );
}

export default Home;