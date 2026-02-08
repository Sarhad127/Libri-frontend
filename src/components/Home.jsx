import Sidebar from './Sidebar';
import MainContent from './MainContent';
import TopBar from './TopBar';
import '../styles/Home.css';

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
    return (
        <div className="home-layout">
            <Sidebar />
            <div className="main-area">
                <TopBar
                    user={user}
                    onLoginSuccess={onLoginSuccess}
                    onUserPage={() => setPage('user')}
                    goToRegister={() => setPage('register')}
                    onLogout={onLogout}
                    goToCart={goToCart}
                    page={page}
                    cartItems={cartItems}
                />
                <MainContent
                    user={user}
                    page={page}
                    cartItems={cartItems}
                    onAddToCart={onAddToCart}
                    onRemoveItem={onRemoveFromCart}
                    setPage={setPage}
                />
            </div>
        </div>
    );
}

export default Home;