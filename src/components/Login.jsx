import { useState } from 'react';
import { loginUser } from '../services/api.js';
import '../styles/Login.css';

function Login({ goToRegister, goToHome }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

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
                    role: data.role,
                })
            );

            goToHome({
                id: data.id,
                email: data.email,
                role: data.role,
            });
        } catch {
            alert('Login failed');
        }
    };

    return (
        <div className="login-page">
            <div className="login-card">
                <h2>Login</h2>

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

                <p className="login-footer">
                    Don’t have an account?{' '}
                    <span onClick={goToRegister}>Register</span>
                </p>
            </div>
        </div>
    );
}

export default Login;