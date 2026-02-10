import '../styles/SubTopBar.css';

function SubTopBar({ onFilter }) {
    const filters = ["All Books", "Most Popular", "New Arrivals", "Top Rated", "Bestsellers"];

    return (
        <div className="sub-top-bar">
            {filters.map((f) => (
                <button key={f} onClick={() => onFilter(f)}>{f}</button>
            ))}
        </div>
    );
}

export default SubTopBar;