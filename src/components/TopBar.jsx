import { useState } from 'react';
import { loginUser } from '../services/api.js';
import '../styles/TopBar.css';

function TopBar({ user, goToRegister, onLoginSuccess, onUserPage, onLogout }) {
    const [showLoginDropdown, setShowLoginDropdown] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const toggleDropdown = () => setShowLoginDropdown(!showLoginDropdown);

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const data = await loginUser(email, password);

            localStorage.setItem('token', data.token);
            localStorage.setItem(
                'user',
                JSON.stringify({
                    id: data.id,
                    email: data.email,
                    username: data.username || data.firstName,
                    role: data.role,
                })
            );

            onLoginSuccess({
                id: data.id,
                email: data.email,
                username: data.username || data.firstName,
                role: data.role,
            });

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

            <div className="user-button" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                {user ? (
                    <>
                        <button onClick={() => onUserPage(user)}>
                            {user.username || user.email}
                        </button>
                        <button onClick={onLogout} style={{ border: '1px solid #fff', background: 'transparent', color: '#fff', cursor: 'pointer', padding: '6px 8px' }}>
                            Logout
                        </button>
                    </>
                ) : (
                    <div className="login-dropdown-wrapper">
                        <button onClick={toggleDropdown}>Login</button>

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