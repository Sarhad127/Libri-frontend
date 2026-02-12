import React, { useEffect, useState } from 'react';
import { fetchUserProfile } from '../../services/api.js';
import './CheckoutUserInfo.css';

function CheckoutUserInfo({ onNext, onBack }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            setError('User not logged in.');
            setLoading(false);
            return;
        }

        const getUser = async () => {
            try {
                const data = await fetchUserProfile(token);
                setUser(data);
            } catch (err) {
                console.error(err);
                setError('Failed to fetch user info.');
            } finally {
                setLoading(false);
            }
        };

        getUser();
    }, []);

    if (loading) return <p className="cui-loading">Loading user info...</p>;
    if (error) return <p className="cui-error">{error}</p>;
    if (!user) return null;

    return (
        <div className="cui-panel">
            <h2 className="cui-heading-main">Confirm your details</h2>

            <h3 className="cui-heading-sub">Personal details</h3>
            <div className="cui-details">
                <div className="cui-detail-row">
                    <span className="cui-label">First name</span>
                    <span className="cui-value">{user.firstName || '—'}</span>
                </div>

                <div className="cui-detail-row">
                    <span className="cui-label">Last name</span>
                    <span className="cui-value">{user.lastName || '—'}</span>
                </div>

                <div className="cui-detail-row">
                    <span className="cui-label">Email</span>
                    <span className="cui-value">{user.email || '—'}</span>
                </div>

                <div className="cui-detail-row">
                    <span className="cui-label">Phone</span>
                    <span className="cui-value">{user.phoneNumber || '—'}</span>
                </div>

                <div className="cui-detail-row">
                    <span className="cui-label">Address</span>
                    <span className="cui-value">{user.address || '—'}</span>
                </div>
            </div>

            <div className="cui-buttons">
                <button className="cui-back-button" onClick={onBack}>
                    ← Back to cart
                </button>

                <button className="cui-next-button" onClick={onNext}>
                    Proceed to shipping →
                </button>
            </div>
        </div>
    );
}

export default CheckoutUserInfo;