import '../styles/Sidebar.css';

function Sidebar() {
    return (
        <aside className="sidebar">
            <h3>Filter</h3>

            <div className="filter-group">
                <h4>Language</h4>
                <ul>
                    <li><input type="checkbox" /> Swedish</li>
                    <li><input type="checkbox" /> English</li>
                </ul>
            </div>

            <div className="filter-group">
                <h4>Category</h4>
                <ul>
                    <li><input type="checkbox" /> Fantasy</li>
                    <li><input type="checkbox" /> Romance</li>
                    <li><input type="checkbox" /> Fiction</li>
                    <li><input type="checkbox" /> Crime</li>
                    <li><input type="checkbox" /> Science</li>
                    <li><input type="checkbox" /> Biography</li>
                    <li><input type="checkbox" /> History</li>
                    <li><input type="checkbox" /> Children & Teens</li>
                    <li><input type="checkbox" /> Horror</li>
                    <li><input type="checkbox" /> Adventure</li>
                </ul>
            </div>

            <div className="filter-group">
                <h4>Format</h4>
                <ul>
                    <li><input type="checkbox" /> Inbunden</li>
                    <li><input type="checkbox" /> Pocket</li>
                </ul>
            </div>
        </aside>
    );
}

export default Sidebar;
