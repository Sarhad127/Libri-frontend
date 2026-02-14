import { useState, useEffect, useCallback, useMemo } from 'react';

export function useBookFilters(allBooks, setPage) {
    const [baseBooks, setBaseBooks] = useState(allBooks);
    const [sidebarFilters, setSidebarFilters] = useState({
        languages: [],
        categories: [],
        formats: []
    });
    const [sortOption, setSortOption] = useState('none');
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        setBaseBooks(allBooks);
    }, [allBooks]);

    const applySidebarFilters = useCallback((books) => {
        return books.filter(book =>
            (sidebarFilters.languages.length === 0 || sidebarFilters.languages.includes(book.language)) &&
            (sidebarFilters.categories.length === 0 || sidebarFilters.categories.includes(book.category)) &&
            (sidebarFilters.formats.length === 0 || sidebarFilters.formats.includes(book.format))
        );
    }, [sidebarFilters]);

    const sortedBooks = useMemo(() => {

        let filtered = [...baseBooks];

        if (searchQuery) {
            const lower = searchQuery.toLowerCase();
            filtered = filtered.filter(book =>
                book.title?.toLowerCase().includes(lower) ||
                book.author?.toLowerCase().includes(lower) ||
                book.category?.toLowerCase().includes(lower) ||
                book.language?.toLowerCase().includes(lower) ||
                book.format?.toLowerCase().includes(lower) ||
                book.description?.toLowerCase().includes(lower)
            );
        }

        filtered = applySidebarFilters(filtered);

        return filtered.sort((a, b) => {
            switch (sortOption) {
                case 'title': return a.title.localeCompare(b.title);
                case 'author': return (a.author || '').localeCompare(b.author || '');
                case 'reviews': return (b.reviewCount || 0) - (a.reviewCount || 0);
                case 'latest': return new Date(b.createdAt) - new Date(a.createdAt);
                case 'oldest': return new Date(a.createdAt) - new Date(b.createdAt);
                case 'price-low': return a.price - b.price;
                case 'price-high': return b.price - a.price;
                default: return 0;
            }
        });
    }, [baseBooks, sidebarFilters, sortOption, applySidebarFilters, searchQuery]);

    const handleFilter = useCallback((filter) => {
        let books = [...allBooks];

        switch (filter) {
            case "Most Popular":
                books.sort((a, b) => (b.reviewCount || 0) - (a.reviewCount || 0));
                break;

            case "Top Rated":
                books.sort((a, b) => (b.reviewCount || 0) - (a.reviewCount || 0));
                break;

            case "Bestsellers":
                books.sort((a, b) => (b.stock || 0) - (a.stock || 0));
                break;

            case "Newest":
                books.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
                break;

            case "All Books":
            default:
                books = allBooks;
        }

        setBaseBooks(books);
        setSortOption('none');
        setPage("home");
    }, [allBooks, setPage]);

    const handleSidebarFilters = useCallback((newFilters) => {
        setSidebarFilters(newFilters);
    }, []);

    const handleSortChange = useCallback((newSort) => {
        setSortOption(newSort);
    }, []);

    const handleSearch = useCallback((query) => {
        setSearchQuery(query);
        setPage('home');
    }, [setPage]);

    return {
        baseBooks,
        sortedBooks,
        sidebarFilters,
        sortOption,
        searchQuery,
        handleFilter,
        handleSidebarFilters,
        handleSortChange,
        handleSearch
    };
}