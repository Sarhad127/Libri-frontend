import React from 'react';
import '../styles/UserProfile.css';

function HistoryTab({ history }) {
    if (!history || history.length === 0) {
        return (
            <div className="tab-content">
                <h3>History</h3>
                <p>No history yet.</p>
            </div>
        );
    }

    return (
        <div className="tab-content">
            <h3>History</h3>
            <ul>
                {history.map((item, index) => (
                    <li key={index}>{item}</li>
                ))}
            </ul>
        </div>
    );
}

export default HistoryTab;