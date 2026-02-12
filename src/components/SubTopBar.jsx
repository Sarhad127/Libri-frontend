import '../styles/SubTopBar.css';
import { Menu } from 'lucide-react';

function SubTopBar({ onFilter }) {
    const filters = ["All Books", "Most Popular", "Top Rated", "Bestsellers"];

    return (
        <div className="sub-top-bar">
            {filters.map((f) => (
                <button key={f} onClick={() => onFilter(f)} className={f === "All Books" ? "with-icon" : ""}>
                    {f === "All Books" && <Menu size={16} />}
                    {f}
                </button>
            ))}
        </div>
    );
}

export default SubTopBar;