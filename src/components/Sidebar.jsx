import '../styles/Sidebar.css';

function Sidebar({ goHome }) {
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
