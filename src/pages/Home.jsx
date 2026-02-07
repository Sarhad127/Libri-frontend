function Home({ user, goToLogin }) {
    return (
        <div>
            <h2>Welcome, {user.username}!</h2>
            <p>Role: {user.role}</p>
            <button onClick={goToLogin}>Logout</button>
        </div>
    );
}


export default Home