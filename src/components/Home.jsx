import Sidebar from './Sidebar';
import MainContent from './MainContent';
import TopBar from './TopBar';
import '../styles/Home.css';

function Home({
                  user,
                  onLoginSuccess,
                  showUserPage,
                  showRegisterPage,
                  onUserPage,
                  onRegisterPage,
                  onLogout,
                  goToCart,
                  cartItems,
                  onAddToCart,
                  onRemoveFromCart,
                  showCart
              }) {
    return (
        <div className="home-layout">
            <Sidebar />
            <div className="main-area">
                <TopBar
                    user={user}
                    onLoginSuccess={onLoginSuccess}
                    onUserPage={onUserPage}
                    goToRegister={onRegisterPage}
                    onLogout={onLogout}
                    goToCart={goToCart}
                    showRegisterPage={showRegisterPage}
                />
                <MainContent
                    user={user}
                    showUserPage={showUserPage}
                    showRegisterPage={showRegisterPage}
                    showCart={showCart}
                    cartItems={cartItems}
                    onAddToCart={onAddToCart}
                    onRemoveItem={onRemoveFromCart}
                />
            </div>
        </div>
    );
}

export default Home;