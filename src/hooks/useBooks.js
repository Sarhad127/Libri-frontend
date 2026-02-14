import { useState, useEffect } from 'react';
import { fetchBooks } from '../services/api.js';

const BOOKS_CACHE_KEY = 'books_cache';

export function useBooks() {
    const [allBooks, setAllBooks] = useState([]);
    const [displayBooks, setDisplayBooks] = useState([]);

    const loadBooks = async () => {
        try {
            const books = await fetchBooks();
            setAllBooks(books);
            setDisplayBooks(books);
            sessionStorage.setItem(BOOKS_CACHE_KEY, JSON.stringify(books));
        } catch (err) {
            console.error("Failed to fetch books:", err);
        }
    };

    useEffect(() => {
        const cached = sessionStorage.getItem(BOOKS_CACHE_KEY);
        if (cached) {
            const books = JSON.parse(cached);
            setAllBooks(books);
            setDisplayBooks(books);
        } else {
            loadBooks();
        }
    }, []);

    return { allBooks, displayBooks, setDisplayBooks, refetchBooks: loadBooks };
}