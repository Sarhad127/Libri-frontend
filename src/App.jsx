import { useEffect, useState } from 'react';
import Login from './components/Login';
import Register from './components/Register';
import Home from './components/Home.jsx';
import './App.css';

function App() {
    const [page, setPage] = useState('home');
    const [user, setUser] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem('token');
        const savedUser = JSON.parse(localStorage.getItem('user'));
        if (token && savedUser) setUser(savedUser);
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setUser(null);
        setPage('login');
    };

    return (
        <div className="app-container">
            {page === 'home' && (
                <Home user={user} goToLogin={() => setPage('login')} onLogout={handleLogout} />
            )}

            {(page === 'login' || page === 'register') && (
                <div className="login-page">
                    {page === 'login' && (
                        <Login
                            goToRegister={() => setPage('register')}
                            goToHome={(user) => {
                                setUser(user);
                                localStorage.setItem('user', JSON.stringify(user));
                                setPage('home');
                            }}
                        />
                    )}
                    {page === 'register' && <Register goToLogin={() => setPage('login')} />}
                </div>
            )}
        </div>
    );
}

export default App;