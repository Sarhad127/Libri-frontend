import { importBooks } from '../../services/api.js';
import { useState } from 'react';
import '../../styles/AdminPage.css';

function AdminPage() {
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');
    const [status, setStatus] = useState('');

    const handleImport = async () => {
        setLoading(true);
        setMessage('');
        setStatus('');

        try {
            const result = await importBooks();

            if ((result.added + result.updated) === 0) {
                setMessage('All books already updated and fetched.');
                setStatus('info');
            } else {
                const addedMsg = result.added > 0 ? `${result.added} added` : '';
                const updatedMsg = result.updated > 0 ? `${result.updated} updated` : '';
                const changes = [addedMsg, updatedMsg].filter(Boolean).join(', ');

                setMessage(`Book import completed successfully! ${changes}`);
                setStatus('success');
            }
        } catch (err) {
            setMessage(`${err.message}`);
            setStatus('error');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="admin-container">
            <h2>Admin Panel</h2>
            <button onClick={handleImport} disabled={loading}>
                {loading ? 'Importing...' : 'Import Books from JSON'}
            </button>

            {message && (
                <p className={`admin-message ${status}`}>
                    {message}
                </p>
            )}
        </div>
    );
}

export default AdminPage;
