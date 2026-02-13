import React, { useState } from 'react';
import '../../styles/UserProfile.css';
import Favorites from "./Favorites.jsx";
import UserInfo from "./UserInfo.jsx";
import HistoryTab from "./HistoryTab.jsx";
import AdminPanel from "./AdminPanel.jsx";

function UserProfile({ onAddToCart, favoriteIds, onToggleFavorite, user }) {
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

            case 'admin':
                return <AdminPanel />;

            default:
                return null;
        }
    };

    const isAdmin = user?.role === 'ADMIN';

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

                {isAdmin && (
                    <button
                        className={activeTab === 'admin' ? 'active' : ''}
                        onClick={() => setActiveTab('admin')}
                    >
                        Admin Panel
                    </button>
                )}
            </div>

            <div className="profile-content">
                {renderTabContent()}
            </div>
        </div>
    );
}

export default UserProfile;