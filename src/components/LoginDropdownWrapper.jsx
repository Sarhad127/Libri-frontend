import { useState, useEffect } from 'react';
import LoginForm from './LoginForm.jsx';
import '../styles/LoginDropdownWrapper.css'

function LoginDropdownWrapper({ goToRegister, onLoginSuccess, showRegisterPage }) {
    const [showLoginDropdown, setShowLoginDropdown] = useState(false);

    const toggleDropdown = () => setShowLoginDropdown(!showLoginDropdown);

    useEffect(() => {
        if (showRegisterPage) {
            const timer = setTimeout(() => setShowLoginDropdown(false), 0);
            return () => clearTimeout(timer);
        }
    }, [showRegisterPage]);

    return (
        <div className="login-dropdown-wrapper">
            <button className="login-btn" onClick={toggleDropdown}>Login</button>
            {showLoginDropdown && (
                <LoginForm
                    onLoginSuccess={onLoginSuccess}
                    toggleDropdown={setShowLoginDropdown}
                    goToRegister={goToRegister}
                />
            )}
        </div>
    );
}

export default LoginDropdownWrapper;
