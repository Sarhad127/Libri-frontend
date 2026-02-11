import '../styles/SortDropdown.css';

function SortDropdown({ sortOption, onSortChange }) {
    return (
        <div className="sort-dropdown">
            <label htmlFor="sort">Sort by:</label>
            <select
                id="sort"
                value={sortOption}
                onChange={(e) => onSortChange(e.target.value)}
            >
                <option value="title">Title (A–Z)</option>
                <option value="author">Author</option>
                <option value="reviews">Most Reviews</option>
                <option value="latest">Latest</option>
                <option value="oldest">Oldest</option>
                <option value="price-high">highest Price</option>
                <option value="price-low">Lowest Price</option>
            </select>
        </div>
    );
}

export default SortDropdown;