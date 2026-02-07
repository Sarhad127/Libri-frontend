import Sidebar from './Sidebar';
import MainContent from './MainContent';
import TopBar from './TopBar';
import '../styles/Home.css';

function Home({ user, onLoginSuccess, goToRegister, showUserPage, onUserPage, onLogout }) {
    return (
        <div className="home-layout">
            <Sidebar />

            <div className="main-area">
                <TopBar
                    user={user}
                    onLoginSuccess={onLoginSuccess}
                    goToRegister={goToRegister}
                    onUserPage={onUserPage}
                    onLogout={onLogout}
                />
                <MainContent user={user} showUserPage={showUserPage} />
            </div>
        </div>
    );
}

export default Home;