import { useState } from 'react'
import './App.css'
import Login from './pages/Login'
import Register from './pages/Register'

function App() {
    const [page, setPage] = useState('login')

    return (
        <div>
            {page === 'login' && (
                <Login goToRegister={() => setPage('register')} />
            )}
            {page === 'register' && (
                <Register goToLogin={() => setPage('login')} />
            )}
        </div>
    )
}

export default App