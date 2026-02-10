import React from 'react';
import '../styles/UserInfo.css';

function UserInfo({ user }) {
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