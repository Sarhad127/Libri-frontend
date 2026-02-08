import '../styles/Sidebar.css';

function Sidebar({
                     goHome,
                     selectedLanguages,
                     onLanguageChange,
                     selectedCategories,
                     onCategoryChange,
                     selectedFormats,
                     onFormatChange
                 }) {

    const handleLanguageToggle = (lang) => {
        if (selectedLanguages.includes(lang)) {
            onLanguageChange(selectedLanguages.filter(l => l !== lang));
        } else {
            onLanguageChange([...selectedLanguages, lang]);
        }
    };

    return (
        <aside className="sidebar">

            <div className="filter-group">
                <h4>Libri</h4>
                <ul>
                    <li className="clickable-item" onClick={goHome}>
                        Books
                    </li>
                </ul>
            </div>

            <div className="filter-group">
                <h4>Language</h4>
                <ul>
                    {["Swedish","English"].map(lang => (
                        <li key={lang}>
                            <label>
                                <input
                                    type="checkbox"
                                    checked={selectedLanguages.includes(lang)}
                                    onChange={() => handleLanguageToggle(lang)}
                                />
                                {lang}
                            </label>
                        </li>
                    ))}
                </ul>
            </div>

            <div className="filter-group">
                <h4>Category</h4>
                <ul>
                    {[
                        "Fantasy",
                        "Romance",
                        "Fiction",
                        "Crime",
                        "Science",
                        "Biography",
                        "History",
                        "Children & Teens",
                        "Horror",
                        "Adventure"
                    ].map(cat => (
                        <li key={cat}>
                            <label>
                                <input
                                    type="checkbox"
                                    checked={selectedCategories.includes(cat)}
                                    onChange={() => {
                                        if (selectedCategories.includes(cat)) {
                                            onCategoryChange(selectedCategories.filter(c => c !== cat));
                                        } else {
                                            onCategoryChange([...selectedCategories, cat]);
                                        }
                                    }}
                                />
                                {cat}
                            </label>
                        </li>
                    ))}
                </ul>
            </div>

            <div className="filter-group">
                <h4>Format</h4>
                <ul>
                    {["Hardcover", "Paperback"].map(format => (
                        <li key={format}>
                            <label>
                                <input
                                    type="checkbox"
                                    checked={selectedFormats.includes(format)}
                                    onChange={() => {
                                        if (selectedFormats.includes(format)) {
                                            onFormatChange(selectedFormats.filter(f => f !== format));
                                        } else {
                                            onFormatChange([...selectedFormats, format]);
                                        }
                                    }}
                                />
                                {format}
                            </label>
                        </li>
                    ))}
                </ul>
            </div>

        </aside>
    );
}

export default Sidebar;