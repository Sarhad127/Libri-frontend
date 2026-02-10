import React from 'react';
import '../styles/UserProfile.css';

function HistoryTab({ history }) {
    if (!history || history.length === 0) {
        return (
            <div>
                <h3>Order History</h3>
                <p>No orders made yet.</p>
            </div>
        );
    }

    return (
        <div>
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