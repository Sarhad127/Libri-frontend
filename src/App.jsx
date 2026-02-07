import { useEffect, useState } from 'react';
import Register from './components/Register';
import Home from './components/Home.jsx';
import './App.css';

function App() {
    const [user, setUser] = useState(null);
    const [page, setPage] = useState('home');

    useEffect(() => {
        const token = localStorage.getItem('token');
        const savedUser = JSON.parse(localStorage.getItem('user'));
        if (token && savedUser) setUser(savedUser);
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setUser(null);
    };

    const handleLoginSuccess = (userData) => {
        setUser(userData);
    };

    return (
        <div className="app-container">
            {page === 'home' && (
                <Home
                    user={user}
                    onLogout={handleLogout}
                    onLoginSuccess={handleLoginSuccess}
                    goToRegister={() => setPage('register')}
                />
            )}

            {page === 'register' && (
                <Register goToLogin={() => setPage('home')} />
            )}
        </div>
    );
}

export default App;