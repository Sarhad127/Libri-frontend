import Sidebar from './Sidebar';
import MainContent from './MainContent';
import TopBar from './TopBar';
import '../styles/Home.css';
import {useState} from "react";

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

    const [selectedLanguages, setSelectedLanguages] = useState([]);
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [selectedFormats, setSelectedFormats] = useState([]);

    return (
        <div className="home-layout">
            <Sidebar
                goHome={() => setPage('home')}
                selectedLanguages={selectedLanguages}
                onLanguageChange={setSelectedLanguages}
                selectedCategories={selectedCategories}
                onCategoryChange={setSelectedCategories}
                selectedFormats={selectedFormats}
                onFormatChange={setSelectedFormats}
            />
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
                    selectedLanguages={selectedLanguages}
                    selectedCategories={selectedCategories}
                    selectedFormats={selectedFormats}
                />
            </div>
        </div>
    );
}

export default Home;