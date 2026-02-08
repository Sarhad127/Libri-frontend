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
                  onLogout
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
                    showRegisterPage={showRegisterPage}
                />
                <MainContent
                    user={user}
                    showUserPage={showUserPage}
                    showRegisterPage={showRegisterPage}
                />
            </div>
        </div>
    );
}

export default Home;