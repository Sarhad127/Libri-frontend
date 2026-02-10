import React, { useState, useEffect } from 'react';
import { fetchUserProfile } from '../services/api.js';
import '../styles/UserInfo.css';

function UserInfo() {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const token = localStorage.getItem('token')

    useEffect(() => {
        if (!token) return;
        fetchUserProfile(token)
            .then(data => setUser(data))
            .catch(err => {
                console.error(err);
                setError('Failed to load user info.');
            })
            .finally(() => setLoading(false));
    }, [token]);

    if (loading) return <p>Loading user info...</p>;
    if (error) return <p>{error}</p>;
    if (!user) return null;

    return (
        <div className="user-info-dark">
            <div className="user-header">
                <div className="avatar">
                    {user.firstName?.[0]}
                    {user.lastName?.[0]}
                </div>

                <div className="user-text">
                    <h2 className="user-name">
                        {user.firstName} {user.lastName}
                    </h2>
                    <p className="user-email">{user.email}</p>
                </div>
            </div>

            <h3 className="section-title">Personal details</h3>
            <div className="details">
                <div className="detail-row">
                    <span className="label">First name</span>
                    <span className="value">{user.firstName || '—'}</span>
                </div>

                <div className="detail-row">
                    <span className="label">Last name</span>
                    <span className="value">{user.lastName || '—'}</span>
                </div>

                <div className="detail-row">
                    <span className="label">Email</span>
                    <span className="value">{user.email || '—'}</span>
                </div>

                <div className="detail-row">
                    <span className="label">Phone</span>
                    <span className="value">{user.phoneNumber || '—'}</span>
                </div>

                <div className="detail-row">
                    <span className="label">Address</span>
                    <span className="value">{user.address || '—'}</span>
                </div>

                <div className="detail-row">
                    <span className="label">Registered</span>
                    <span className="value">
                        {new Date(user.createdAt).toLocaleDateString()}
                    </span>
                </div>
            </div>
        </div>
    );
}

export default UserInfo;