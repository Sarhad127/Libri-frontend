import { useEffect, useState } from 'react';
import Login from './pages/Login';
import Register from './pages/Register';
import Home from './pages/Home.jsx';
import './App.css';

function App() {
    const [page, setPage] = useState('home');
    const [user, setUser] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem('token');
        const savedUser = JSON.parse(localStorage.getItem('user'));
        if (token && savedUser) {
            setUser(savedUser);
        }
    }, []);

    return (
        <div className="app-container">
            {page === 'home' && (
                <Home user={user} goToLogin={() => setPage('login')} />
            )}

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

            {page === 'register' && (
                <Register goToLogin={() => setPage('login')} />
            )}
        </div>
    );
}

export default App;