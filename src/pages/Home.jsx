import { useEffect, useState } from "react";
import "./styles/Home.css";

function Home({ user, goToLogin }) {
    const [book, setBook] = useState(null);

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        window.location.reload();
    };

    useEffect(() => {
        fetch("https://openlibrary.org/search.json?q=foundation&limit=10")
            .then(res => res.json())
            .then(data => setBook(data.docs[0]))
            .catch(err => console.error(err));
    }, []);

    return (
        <div className="home-page">
            <div className="home-top-right">
                {user ? (
                    <button onClick={handleLogout}>Logout</button>
                ) : (
                    <button onClick={goToLogin}>Login</button>
                )}
            </div>

            {user && (
                <div className="home-user-info">
                    <h2>Welcome, {user.email}!</h2>
                    <p>Role: {user.role}</p>
                </div>
            )}

            <hr />

            {book && (
                <div className="book-card">
                    {book.cover_i && (
                        <img
                            src={`https://covers.openlibrary.org/b/id/${book.cover_i}-L.jpg`}
                            alt={book.title}
                            className="book-cover"
                        />
                    )}

                    <div className="book-info">
                        <h3 className="book-title">{book.title}</h3>

                        <p><strong>Author:</strong> {book.author_name?.join(", ") || "Unknown"}</p>
                        <p><strong>First published:</strong> {book.first_publish_year || "N/A"}</p>
                        <p><strong>Editions:</strong> {book.edition_count}</p>
                        <p>
                            <strong>Languages:</strong>{" "}
                            {book.language?.map(l => l.toUpperCase()).join(", ")}
                        </p>
                        <p>
                            <strong>Available online:</strong>{" "}
                            {book.has_fulltext ? "Yes" : "No"}
                        </p>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Home;
