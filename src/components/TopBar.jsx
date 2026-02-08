import { useState, useEffect } from 'react';
import { loginUser } from '../services/api.js';
import '../styles/TopBar.css';

function TopBar({ user, goToRegister, onLoginSuccess, onUserPage, onLogout, showRegisterPage }) {
    const [showLoginDropdown, setShowLoginDropdown] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const toggleDropdown = () => setShowLoginDropdown(!showLoginDropdown);

    useEffect(() => {
        if (showRegisterPage) {
            const timer = setTimeout(() => setShowLoginDropdown(false), 0);
            return () => clearTimeout(timer);
        }
    }, [showRegisterPage]);

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const data = await loginUser(email, password);

            const userData = {
                id: data.id,
                email: data.email,
                username: data.username || data.firstName,
                role: data.role,
            };

            localStorage.setItem('token', data.token);
            localStorage.setItem('user', JSON.stringify(userData));

            onLoginSuccess(userData, data.token);

            setShowLoginDropdown(false);
            setEmail('');
            setPassword('');
        } catch {
            alert('Login failed');
        }
    };

    return (
        <div className="top-bar">
            <input type="text" placeholder="Search books..." />
            <button>Search</button>

            <div className="user-button">
                {user ? (
                    <>
                        <button className="user-btn" onClick={() => onUserPage(user)}>
                            {user.username || user.email}
                        </button>
                        <button className="logout-btn" onClick={onLogout}>
                            Logout
                        </button>
                    </>
                ) : (
                    <div className="login-dropdown-wrapper">
                        <button className="login-btn" onClick={toggleDropdown}>Login</button>

                        {showLoginDropdown && (
                            <div className="login-dropdown">
                                <form onSubmit={handleLogin}>
                                    <input
                                        type="email"
                                        placeholder="Email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                    />
                                    <input
                                        type="password"
                                        placeholder="Password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                    />
                                    <button type="submit">Login</button>
                                </form>

                                <p>
                                    Don’t have an account?{' '}
                                    <span onClick={goToRegister}>Register</span>
                                </p>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}

export default TopBar;