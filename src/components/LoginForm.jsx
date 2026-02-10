import { useState } from 'react';
import { loginUser } from '../services/api.js';
import '../styles/LoginForm.css'

function LoginForm({ onLoginSuccess, toggleDropdown, goToRegister }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const data = await loginUser(email, password);

            const userData = {
                id: data.id,
                email: data.email,
                username: data.username || data.firstName,
                role: data.role,
                token: data.token
            };
            localStorage.setItem('token', data.token);
            localStorage.setItem('user', JSON.stringify(userData));
            onLoginSuccess(userData);
            toggleDropdown(false);
            setEmail('');
            setPassword('');
        } catch {
            alert('Login failed');
        }
    };

    return (
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
    );
}

export default LoginForm;