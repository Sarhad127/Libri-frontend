import { useState, useEffect, useCallback } from 'react';
import { fetchFavorites, addFavorite, removeFavorite } from '../services/api.js';

export function useFavorites(token, user) {
    const [favoriteIds, setFavoriteIds] = useState([]);

    useEffect(() => {
        const loadFavorites = async () => {
            if (!token) return;
            try {
                const favorites = await fetchFavorites(token);
                setFavoriteIds(favorites.map(fav => fav.id));
            } catch (err) {
                console.error('Failed to fetch favorites', err);
            }
        };
        loadFavorites();
    }, [token]);

    const toggleFavorite = useCallback(async (bookId) => {
        if (!token || !user) return alert('Please log in first.');
        try {
            if (favoriteIds.includes(bookId)) {
                await removeFavorite(token, bookId);
                setFavoriteIds(prev => prev.filter(id => id !== bookId));
            } else {
                await addFavorite(token, bookId);
                setFavoriteIds(prev => [...prev, bookId]);
            }
        } catch (err) {
            console.error(err);
        }
    }, [token, user, favoriteIds]);

    return { favoriteIds, toggleFavorite };
}