import React, { useState, useEffect } from 'react';
import { fetchUserProfile } from '../services/api.js';
import '../styles/UserProfile.css';
import Favorites from "./Favorites.jsx";
import UserInfo from "./UserInfo.jsx";
import HistoryTab from "./HistoryTab.jsx";

function UserProfile({onAddToCart}) {
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

                return <UserInfo user={userInfo} />;

            case 'history':
                return <HistoryTab history={userInfo?.history} />;

            case 'favorites':
                return <Favorites favorites={userInfo?.favorites} onAddToCart={onAddToCart}/>;

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