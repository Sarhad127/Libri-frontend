function UserButtons({ user, onUserPage, onLogout }) {
    return (
        <>
            <button className="user-btn" onClick={() => onUserPage(user)}>
                {user.username || user.email}
            </button>
            <button className="logout-btn" onClick={onLogout}>
                Logout
            </button>
        </>
    );
}

export default UserButtons;
