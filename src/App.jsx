import { useEffect, useState } from 'react';
import Register from './components/Register';
import Home from './components/Home.jsx';
import './App.css';

function App() {
    const [user, setUser] = useState(null);
    const [page, setPage] = useState('home');
    const [showUserPage, setShowUserPage] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem('token');
        const savedUser = JSON.parse(localStorage.getItem('user'));
        if (token && savedUser) setUser(savedUser);
    }, []);

    const handleLoginSuccess = (userData) => {
        setUser(userData);
        setShowUserPage(false);
    };

    const handleUserPage = () => {
        setShowUserPage(true);
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setUser(null);
        setShowUserPage(false);
        setPage('home');
    };

    return (
        <div className="app-container">
            {page === 'home' && (
                <Home
                    user={user}
                    onLoginSuccess={handleLoginSuccess}
                    goToRegister={() => setPage('register')}
                    showUserPage={showUserPage}
                    onUserPage={handleUserPage}
                    onLogout={handleLogout}
                />
            )}

            {page === 'register' && <Register goToLogin={() => setPage('home')} />}
        </div>
    );
}

export default App;