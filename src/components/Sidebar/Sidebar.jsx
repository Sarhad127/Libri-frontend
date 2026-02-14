import {useEffect, useState} from 'react';
import '../../styles/Sidebar.css';

function Sidebar({onFilterChange}) {

    const [selectedLanguages, setSelectedLanguages] = useState([]);
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [selectedFormats, setSelectedFormats] = useState([]);

    const toggleItem = (list, setList, item) => {
        setList(list.includes(item)
            ? list.filter(i => i !== item)
            : [...list, item]
        );
    };

    useEffect(() => {
        onFilterChange({
            languages: selectedLanguages,
            categories: selectedCategories,
            formats: selectedFormats
        });
    }, [selectedLanguages, selectedCategories, selectedFormats]);

    return (
        <aside className="sidebar">

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