import UserButtons from './UserButtons.jsx';
import LoginDropdownWrapper from './LoginDropdownWrapper.jsx';
import '../styles/TopBar.css';

function TopBar({ user, goToRegister, onLoginSuccess, onUserPage, onLogout, showRegisterPage }) {
    return (
        <div className="top-bar">
            <input type="text" placeholder="Search books..." />
            <button>Search</button>

            <div>
                {user ? (
                    <UserButtons user={user} onUserPage={onUserPage} onLogout={onLogout} />
                ) : (
                    <LoginDropdownWrapper
                        goToRegister={goToRegister}
                        onLoginSuccess={onLoginSuccess}
                        showRegisterPage={showRegisterPage}
                    />
                )}
            </div>
        </div>
    );
}

export default TopBar;