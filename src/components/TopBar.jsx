import './TopBar.css';

function TopBar({ user, goToLogin, onLogout }) {
    return (
        <div className="top-bar">
            <input type="text" placeholder="Search books..." />
            <button>Search</button>

            <div className="user-button">
                {user ? (
                    <button onClick={onLogout}>Logout</button>
                ) : (
                    <button onClick={goToLogin}>Login</button>
                )}
            </div>
        </div>
    );
}

export default TopBar;