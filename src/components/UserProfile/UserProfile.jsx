import React, { useState } from 'react';
import '../../styles/UserProfile.css';
import Favorites from "./Favorites.jsx";
import UserInfo from "./UserInfo.jsx";
import HistoryTab from "./HistoryTab.jsx";

function UserProfile({ onAddToCart, favoriteIds, onToggleFavorite }) {
    const [activeTab, setActiveTab] = useState('info');

    const renderTabContent = () => {
        switch (activeTab) {
            case 'info':
                return <UserInfo />;

            case 'history':
                return <HistoryTab />;

            case 'favorites':
                return (
                    <Favorites
                        onAddToCart={onAddToCart}
                        favoriteIds={favoriteIds}
                        onToggleFavorite={onToggleFavorite}
                    />
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