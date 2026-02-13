import { useEffect } from 'react';

export function useUser(token, setUser, setPage) {

    useEffect(() => {
        const savedUser = JSON.parse(localStorage.getItem('user'));
        if (token && savedUser) {
            setUser(savedUser);
        }
    }, [token, setUser]);

    const handleLoginSuccess = (userData) => {
        setUser(userData);
        setPage('home');
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setUser(null);
        setPage('home');
    };

    return { handleLoginSuccess, handleLogout };
}