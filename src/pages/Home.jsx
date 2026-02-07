function Home({ user, goToLogin }) {

    const handleLogout = () => {
        localStorage.removeItem('token');
        goToLogin();
    };

    return (
        <div>
            <h2>Welcome, {user.email}!</h2>
            <p>Role: {user.role}</p>
            <button onClick={handleLogout}>Logout</button>
        </div>
    );
}

export default Home;
