import Sidebar from './Sidebar';
import MainContent from './MainContent';
import TopBar from './TopBar';
import './Home.css';

function Home({ user, goToLogin }) {
    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        window.location.reload();
    };

    return (
        <div className="home-layout">
            <Sidebar />

            <div className="main-area">
                <TopBar user={user} goToLogin={goToLogin} onLogout={handleLogout} />
                <MainContent user={user} />
            </div>
        </div>
    );
}

export default Home;