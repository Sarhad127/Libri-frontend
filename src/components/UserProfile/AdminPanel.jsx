import { fetchUsers, importBooks, updateUserActiveStatus } from '../../services/api.js';
import { useEffect, useState } from 'react';
import '../../styles/AdminPage.css';
import CreateAdminForm from "./CreateAdminForm.jsx";

function AdminPage({ onBooksUpdated }) {
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');
    const [status, setStatus] = useState('');
    const [users, setUsers] = useState([]);

    const loadUsers = async () => {
        try {
            const data = await fetchUsers();
            setUsers(data);
        } catch (err) {
            console.error('Failed to fetch users:', err);
        }
    };

    useEffect(() => {
        loadUsers();
    }, []);

    const handleImport = async () => {
        setLoading(true);
        setMessage('');
        setStatus('');

        try {
            const result = await importBooks();
            sessionStorage.removeItem('books_cache');
            if (onBooksUpdated) await onBooksUpdated();

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

            await loadUsers();
        } catch (err) {
            setMessage(`${err.message}`);
            setStatus('error');
        } finally {
            setLoading(false);
        }
    };

    const handleToggleActive = async (userId, currentActive) => {
        try {
            const updated = await updateUserActiveStatus(userId, !currentActive);
            setUsers(prev =>
                prev.map(u => (u.id === userId ? { ...u, active: updated.active } : u))
            );
        } catch (err) {
            console.error('Failed to update user:', err);
            alert(`Failed to update user: ${err.message}`);
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

            {users.length > 0 && (
                <div className="admin-section">
                    <h3>Users in System</h3>
                    <table className="admin-table">
                        <thead>
                        <tr>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Email</th>
                            <th>Active</th>
                        </tr>
                        </thead>
                        <tbody>
                        {users.map((user, idx) => (
                            <tr key={idx}>
                                <td>{user.firstName}</td>
                                <td>{user.lastName}</td>
                                <td>{user.email}</td>
                                <td>
                                    <input
                                        type="checkbox"
                                        checked={user.active}
                                        onChange={() => {
                                            console.log('Toggling user', user.id, 'from', user.active, 'to', !user.active);
                                            handleToggleActive(user.id, user.active);
                                        }}
                                    />
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            )}
            <CreateAdminForm onAdminCreated={loadUsers} />
        </div>
    );
}

export default AdminPage;