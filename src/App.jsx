import { useEffect, useState } from 'react';
import Home from './components/Home.jsx';
import './App.css';

function App() {
    const [user, setUser] = useState(null);
    const [showUserPage, setShowUserPage] = useState(false);
    const [showRegisterPage, setShowRegisterPage] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem('token');
        const savedUser = JSON.parse(localStorage.getItem('user'));
        if (token && savedUser) setUser(savedUser);
    }, []);

    const handleLoginSuccess = async (userData) => {
        setUser(userData);
        setShowUserPage(false);
        setShowRegisterPage(false);
    };

    const handleUserPage = () => {
        setShowUserPage(true);
        setShowRegisterPage(false);
    };

    const handleRegisterPage = () => {
        setShowRegisterPage(true);
        setShowUserPage(false);
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setUser(null);
        setShowUserPage(false);
        setShowRegisterPage(false);
    };

    return (
        <div className="app-container">
            <Home
                user={user}
                onLoginSuccess={handleLoginSuccess}
                showUserPage={showUserPage}
                showRegisterPage={showRegisterPage}
                onUserPage={handleUserPage}
                onRegisterPage={handleRegisterPage}
                onLogout={handleLogout}
            />
        </div>
    );
}

export default App;