import Sidebar from "./Sidebar/Sidebar.jsx";
import MainContent from "./MainContent";
import TopBar from "./TopBar/TopBar.jsx";
import SubTopBar from "./SubTopBar/SubTopBar.jsx";
import '../styles/Home.css';
import PromoBar from "./TopBar/PromoBar.jsx";

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

    const centerPages = ['register', 'login', 'user', 'cart', 'checkout'];

    return (
        <div className="home-layout">
            <PromoBar />
            <TopBar
                user={user}
                setPage={setPage}
                onUserPage={() => setPage('user')}
                goToRegister={() => setPage('register')}
                onLogout={onLogout}
                goToCart={goToCart}
                page={page}
                cartItems={cartItems}
                onSearch={onSearch}
            />

            <SubTopBar onFilter={onFilter} />

            <div className={`content-area ${centerPages.includes(page) ? 'centered' : ''}`}>

                {!centerPages.includes(page) && (
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
                            onLoginSuccess={onLoginSuccess}
                        />
                </div>
            </div>
        </div>
    );
}

export default Home;