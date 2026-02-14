import React, { useState, useMemo } from "react";
import BookList from "./BookList.jsx";
import '../../styles/PaginatedBookList.css';

function PaginatedBookList({ books = [], onSelectBook, onAddToCart, favoriteIds, onToggleFavorite }) {
    const [currentPage, setCurrentPage] = useState(1);
    const booksPerPage = 8;

    const totalPages = useMemo(() => Math.ceil(books.length / booksPerPage), [books.length]);

    const currentBooks = useMemo(() => {
        const startIndex = (currentPage - 1) * booksPerPage;
        return books.slice(startIndex, startIndex + booksPerPage);
    }, [books, currentPage]);

    const handleNext = () => {
        setCurrentPage((prev) => Math.min(prev + 1, totalPages));
    };

    const handlePrev = () => {
        setCurrentPage((prev) => Math.max(prev - 1, 1));
    };

    return (
        <div>
            <BookList
                books={currentBooks}
                onSelectBook={onSelectBook}
                onAddToCart={onAddToCart}
                favoriteIds={favoriteIds}
                onToggleFavorite={onToggleFavorite}
            />

            <div className="pagination-buttons">
                <button className="pagination-button" onClick={handlePrev} disabled={currentPage === 1}>
                    Previous
                </button>
                <span className="pagination-info">
                    Page {currentPage} of {totalPages}
                </span>
                <button className="pagination-button" onClick={handleNext} disabled={currentPage === totalPages}>
                    Next
                </button>
            </div>
        </div>
    );
}

export default PaginatedBookList;
