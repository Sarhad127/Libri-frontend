import { useState } from 'react';

function Login({ goToRegister, goToHome }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('http://localhost:8080/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password }),
            });

            if (response.ok) {
                const user = await response.json();
                console.log('Logged in as:', user);

                goToHome(user);
            } else {
                const errorText = await response.text();
                alert('Login failed: ' + errorText);
            }
        } catch (error) {
            console.error('Error:', error);
            alert('An error occurred during login.');
        }
    };

    return (
        <div>
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

            <p>
                Don’t have an account?{' '}
                <button onClick={goToRegister}>Register</button>
            </p>
        </div>
    );
}

export default Login;