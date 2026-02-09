import { useState, useEffect } from 'react';
import '../styles/Sidebar.css';
import SortDropdown from "./SortDropdown.jsx";

function Sidebar({ goHome, books = [], onBooksChange }) {

    const [selectedLanguages, setSelectedLanguages] = useState([]);
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [selectedFormats, setSelectedFormats] = useState([]);
    const [sortOption, setSortOption] = useState('popular');

    const toggleItem = (list, setList, item) => {
        setList(list.includes(item) ? list.filter(i => i !== item) : [...list, item]);
    };

    const filteredBooks = books.filter(book =>
        (selectedLanguages.length === 0 || selectedLanguages.includes(book.language)) &&
        (selectedCategories.length === 0 || selectedCategories.includes(book.category)) &&
        (selectedFormats.length === 0 || selectedFormats.includes(book.format))
    );

    const sortedBooks = [...filteredBooks].sort((a, b) => {
        switch (sortOption) {
            case 'title': return a.title.localeCompare(b.title);
            case 'author': return a.author.localeCompare(b.author);
            case 'reviews': return (b.reviewCount || 0) - (a.reviewCount || 0);
            case 'latest': return new Date(b.publishedDate) - new Date(a.publishedDate);
            case 'oldest': return new Date(a.publishedDate) - new Date(b.publishedDate);
            case 'price-low': return a.price - b.price;
            case 'popular':
            default: return (b.popularity || 0) - (a.popularity || 0);
        }
    });

    useEffect(() => {
        onBooksChange(sortedBooks);
    }, [sortedBooks, onBooksChange]);

    return (
        <aside className="sidebar">

            <div className="filter-group">
                <h4>Libri</h4>
                <ul>
                    <li className="clickable-item" onClick={goHome}>Books</li>
                </ul>
            </div>

            <div className="filter-group">
                <h4>Language</h4>
                {["Swedish", "English"].map(lang => (
                    <label key={lang}>
                        <input
                            type="checkbox"
                            checked={selectedLanguages.includes(lang)}
                            onChange={() => toggleItem(selectedLanguages, setSelectedLanguages, lang)}
                        />
                        {lang}
                    </label>
                ))}
            </div>

            <div className="filter-group">
                <h4>Category</h4>
                {[
                    "Fantasy", "Romance", "Fiction", "Crime", "Science",
                    "Biography", "History", "Children & Teens", "Horror", "Adventure"
                ].map(cat => (
                    <label key={cat}>
                        <input
                            type="checkbox"
                            checked={selectedCategories.includes(cat)}
                            onChange={() => toggleItem(selectedCategories, setSelectedCategories, cat)}
                        />
                        {cat}
                    </label>
                ))}
            </div>

            <div className="filter-group">
                <h4>Format</h4>
                {["Hardcover", "Paperback"].map(format => (
                    <label key={format}>
                        <input
                            type="checkbox"
                            checked={selectedFormats.includes(format)}
                            onChange={() => toggleItem(selectedFormats, setSelectedFormats, format)}
                        />
                        {format}
                    </label>
                ))}
            </div>

            <SortDropdown sortOption={sortOption} onSortChange={setSortOption} />
        </aside>
    );
}

export default Sidebar;