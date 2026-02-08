import React, { useState, useEffect } from 'react';
import { fetchUserProfile } from '../services/api.js';
import '../styles/UserProfile.css';

function UserProfile() {
    const [activeTab, setActiveTab] = useState('info');
    const [userInfo, setUserInfo] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) return;

        setLoading(true);
        fetchUserProfile(token)
            .then(data => {
                setUserInfo(data);
                setLoading(false);
            })
            .catch(err => {
                console.error(err);
                setError('Failed to load user info.');
                setLoading(false);
            });
    }, []);


    const renderTabContent = () => {
        switch (activeTab) {
            case 'info':
                if (loading) return <p>Loading...</p>;
                if (error) return <p>{error}</p>;
                if (!userInfo) return null;

                return (
                    <div className="tab-content">
                        <h3>User Information</h3>
                        <p><strong>First Name:</strong> {userInfo.firstName}</p>
                        <p><strong>Last Name:</strong> {userInfo.lastName}</p>
                        <p><strong>Email:</strong> {userInfo.email}</p>
                        <p><strong>Phone:</strong> {userInfo.phoneNumber}</p>
                        <p><strong>Address:</strong> {userInfo.address}</p>
                        <p><strong>Registered:</strong> {new Date(userInfo.createdAt).toISOString().split('T')[0]}</p>
                    </div>
                );

            case 'history':
                return (
                    <div className="tab-content">
                        <h3>History</h3>
                        <p>No history yet.</p>
                    </div>
                );

            case 'favorites':
                return (
                    <div className="tab-content">
                        <h3>Favorites</h3>
                        <p>No favorites yet.</p>
                    </div>
                );

            default:
                return null;
        }
    };

    return (
        <div className="user-profile">
            <div className="profile-top-bar">
                <button
                    className={activeTab === 'info' ? 'active' : ''}
                    onClick={() => setActiveTab('info')}
                >
                    User Info
                </button>
                <button
                    className={activeTab === 'history' ? 'active' : ''}
                    onClick={() => setActiveTab('history')}
                >
                    History
                </button>
                <button
                    className={activeTab === 'favorites' ? 'active' : ''}
                    onClick={() => setActiveTab('favorites')}
                >
                    Favorites
                </button>
            </div>

            <div className="profile-content">
                {renderTabContent()}
            </div>
        </div>
    );
}

export default UserProfile;