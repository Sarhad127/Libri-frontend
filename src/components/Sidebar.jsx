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
                    <li><input type="checkbox" /> Children & Teens</li>
                    <li><input type="checkbox" /> Biographies</li>
                    <li><input type="checkbox" /> Data & IT</li>
                    <li><input type="checkbox" /> Crime</li>
                    <li><input type="checkbox" /> Animals & Nature</li>
                    <li><input type="checkbox" /> Economics & Leadership</li>
                    <li><input type="checkbox" /> Family & Health</li>
                    <li><input type="checkbox" /> Film, Radio & TV</li>
                    <li><input type="checkbox" /> Philosophy & Religion</li>
                    <li><input type="checkbox" /> Home & Garden</li>
                    <li><input type="checkbox" /> History & Archeology</li>
                    <li><input type="checkbox" /> Culture</li>
                    <li><input type="checkbox" /> Food & Drink</li>
                    <li><input type="checkbox" /> Medicine</li>
                    <li><input type="checkbox" /> Science & Technology</li>
                    <li><input type="checkbox" /> Psychology & Education</li>
                    <li><input type="checkbox" /> Travel</li>
                    <li><input type="checkbox" /> Society & Politics</li>
                    <li><input type="checkbox" /> Notebooks & Planners</li>
                    <li><input type="checkbox" /> Fiction</li>
                    <li><input type="checkbox" /> Sports, Leisure & Hobby</li>
                    <li><input type="checkbox" /> Comics</li>
                    <li><input type="checkbox" /> Trend & Lifestyle</li>
                </ul>
            </div>

            <div className="filter-group">
                <h4>Format</h4>
                <ul>
                    <li><input type="checkbox" /> Pocket</li>
                    <li><input type="checkbox" /> Hardcover</li>
                    <li><input type="checkbox" /> eBook</li>
                    <li><input type="checkbox" /> Board</li>
                </ul>
            </div>

            <div className="filter-group">
                <h4>Age</h4>
                <ul>
                    <li><input type="checkbox" /> 0-3 years</li>
                    <li><input type="checkbox" /> 3-6 years</li>
                    <li><input type="checkbox" /> 6-9 years</li>
                    <li><input type="checkbox" /> 9-12 years</li>
                    <li><input type="checkbox" /> Young Adults</li>
                </ul>
            </div>
        </aside>
    );
}

export default Sidebar;
