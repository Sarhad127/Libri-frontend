import { useState, useEffect } from 'react';
import { fetchBooks } from '../services/api.js';

export function useBooks() {
    const [allBooks, setAllBooks] = useState([]);
    const [displayBooks, setDisplayBooks] = useState([]);

    useEffect(() => {
        const loadBooks = async () => {
            try {
                const books = await fetchBooks();
                setAllBooks(books);
                setDisplayBooks(books);
            } catch (err) {
                console.error("Failed to fetch books:", err);
            }
        };
        loadBooks();
    }, []);

    return { allBooks, displayBooks, setDisplayBooks };
}