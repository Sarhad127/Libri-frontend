import { useState } from 'react';
import { createAdminUser } from '../../services/api.js';
import './CreateAdminForm.css'

function CreateAdminForm({ onAdminCreated }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [message, setMessage] = useState('');
    const [status, setStatus] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage('');
        setStatus('');

        try {
            const data = await createAdminUser({ email, password, firstName, lastName });

            setMessage(`Admin created: ${data.email}`);
            setStatus('success');

            setEmail('');
            setPassword('');
            setFirstName('');
            setLastName('');

            if (onAdminCreated) onAdminCreated();
        } catch (err) {
            setMessage(err.message);
            setStatus('error');
        }
    };

    return (
        <div className="create-admin-form">
            <h3>Create New Admin</h3>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="First Name"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    required
                />
                <input
                    type="text"
                    placeholder="Last Name"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    required
                />
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <button type="submit">Create Admin</button>
            </form>
            {message && <p className={status}>{message}</p>}
        </div>
    );
}

export default CreateAdminForm;