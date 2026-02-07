import '../styles/Sidebar.css';

function Sidebar() {
    return (
        <aside className="sidebar">
            <h3>Categories</h3>
            <ul>
                <li>Fiction</li>
                <li>Science</li>
                <li>Fantasy</li>
                <li>History</li>
            </ul>
        </aside>
    );
}

export default Sidebar;