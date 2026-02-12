import { User, LogOut } from 'lucide-react';

function UserButtons({ user, onUserPage, onLogout }) {
    return (
        <>
            <button className="user-btn" onClick={() => onUserPage(user)}>
                <User size={16} style={{ marginRight: '6px', verticalAlign: 'middle' }} />
                {user.username || user.email}
            </button>
            <button className="logout-btn" onClick={onLogout}>
                <LogOut size={16} style={{ marginRight: '6px' }} />
                Logout
            </button>
        </>
    );
}

export default UserButtons;
