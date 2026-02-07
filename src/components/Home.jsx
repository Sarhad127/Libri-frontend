import Sidebar from './Sidebar';
import MainContent from './MainContent';
import TopBar from './TopBar';
import '../styles/Home.css';

function Home({ user, onLogout, onLoginSuccess, goToRegister }) {
    return (
        <div className="home-layout">
            <Sidebar />

            <div className="main-area">
                <TopBar
                    user={user}
                    onLogout={onLogout}
                    onLoginSuccess={onLoginSuccess}
                    goToRegister={goToRegister}
                />
                <MainContent user={user} />
            </div>
        </div>
    );
}

export default Home;