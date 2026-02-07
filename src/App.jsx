import { useState } from 'react'
import './App.css'
import Login from './pages/Login'
import Register from './pages/Register'
import Home from "./pages/Home.jsx";


function App() {
    const [page, setPage] = useState('login');
    const [user, setUser] = useState(null);

    return (
        <>
            {page === 'home' && <Home user={user} goToLogin={() => setPage('login')} />}

            {page === 'login' && (
                <Login
                    goToRegister={() => setPage('register')}
                    goToHome={(user) => {
                        setUser(user);
                        setPage('home');
                    }}
                />
            )}

            {page === 'register' && <Register goToLogin={() => setPage('login')} />}
        </>
    );
}

export default App;