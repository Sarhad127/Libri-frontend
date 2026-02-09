import {useState, useEffect, useMemo} from 'react';
import '../styles/Sidebar.css';

function Sidebar({ goHome, books = [], onBooksChange }) {

    const [selectedLanguages, setSelectedLanguages] = useState([]);
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [selectedFormats, setSelectedFormats] = useState([]);

    const toggleItem = (list, setList, item) => {
        setList(list.includes(item) ? list.filter(i => i !== item) : [...list, item]);
    };

    const filteredBooks = useMemo(() => {
        return books.filter(book =>
            (selectedLanguages.length === 0 || selectedLanguages.includes(book.language)) &&
            (selectedCategories.length === 0 || selectedCategories.includes(book.category)) &&
            (selectedFormats.length === 0 || selectedFormats.includes(book.format))
        );
    }, [books, selectedLanguages, selectedCategories, selectedFormats]);

    useEffect(() => {
        onBooksChange(filteredBooks);
    }, [filteredBooks, onBooksChange]);

    return (
        <aside className="sidebar">

            <div className="filter-group">
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

        </aside>
    );
}

export default Sidebar;