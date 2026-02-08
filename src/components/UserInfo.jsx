import React from 'react';
import '../styles/UserInfo.css';

function UserInfo({ user }) {
    if (!user) return null;

    return (
        <div className="user-info">
            <h3>User Information</h3>
            <p><strong>First Name:</strong> {user.firstName}</p>
            <p><strong>Last Name:</strong> {user.lastName}</p>
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>Phone:</strong> {user.phoneNumber}</p>
            <p><strong>Address:</strong> {user.address}</p>
            <p><strong>Registered:</strong> {new Date(user.createdAt).toISOString().split('T')[0]}</p>
        </div>
    );
}

export default UserInfo;