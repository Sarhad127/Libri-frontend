import { useEffect, useState } from 'react';
import '../styles/MainContent.css';

function MainContent({ user }) {
    const [books, setBooks] = useState([]);

    useEffect(() => {
        fetch("https://openlibrary.org/search.json?q=foundation&limit=10")
            .then(res => res.json())
            .then(data => setBooks(data.docs))
            .catch(err => console.error(err));
    }, []);

    return (
        <div className="main-content">
            {user && (
                <div className="home-user-info">
                    <h2>Welcome, {user.email}!</h2>
                    <p>Role: {user.role}</p>
                </div>
            )}

            <div className="book-list">
                {books.map(book => (
                    <div key={book.key} className="book-card">
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
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default MainContent;