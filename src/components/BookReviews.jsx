import { useState, useEffect } from "react";
import { createReview, fetchBookReviews } from "../services/api.js";
import '../styles/BookReviews.css';

function BookReviews({ bookId, token, onReviewAdded }) {
    const [reviews, setReviews] = useState([]);
    const [showReviewForm, setShowReviewForm] = useState(false);
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState('');
    const [submitting, setSubmitting] = useState(false);
    const [hoveredStar, setHoveredStar] = useState(0);

    useEffect(() => {
        const loadReviews = async () => {
            try {
                const data = await fetchBookReviews(bookId);
                setReviews(data);
            } catch (err) {
                console.error("Failed to fetch reviews:", err);
            }
        };
        loadReviews();
    }, [bookId]);

    const handleStarClick = (star) => setRating(star);

    const handleSubmit = async () => {
        if (!token) {
            alert("You must be logged in to submit a review");
            return;
        }
        if (rating === 0 || !comment.trim()) {
            alert("Please provide a rating and comment.");
            return;
        }

        setSubmitting(true);
        try {
            const reviewData = { bookId, rating, comment };
            const newReview = await createReview(token, reviewData);

            alert("Review submitted successfully!");
            setShowReviewForm(false);
            setRating(0);
            setComment('');
            setReviews(prev => [newReview, ...prev]);
            onReviewAdded?.(newReview);
        } catch (err) {
            alert(err.message);
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="reviews-section">
            <h3>Reviews</h3>

            {reviews.length > 0 ? (
                <>
                    <p className="review-summary">
                        {reviews.length} review(s) • Average rating:{" "}
                        {(reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1)} ⭐
                    </p>

                    <div className="reviews-list">
                        {reviews.map((review) => (
                            <div key={review.id} className="review-card">
                                <div className="review-header">
                                    <span className="review-user">{review.firstName || "Anonymous"}</span>
                                    <span className="review-rating">
                                        {"★".repeat(review.rating)}
                                        {"☆".repeat(5 - review.rating)}
                                    </span>
                                </div>
                                {review.createdAt && (
                                    <p className="review-date">
                                        {new Date(review.createdAt).toLocaleDateString()}
                                    </p>
                                )}
                                {review.comment && <p className="review-comment">{review.comment}</p>}
                            </div>
                        ))}
                    </div>
                </>
            ) : (
                <p className="no-reviews">No reviews yet. Be the first to review this book.</p>
            )}

            <button
                className="write-review-button"
                onClick={() => setShowReviewForm(!showReviewForm)}
            >
                {showReviewForm ? "Cancel" : "Write a Review"}
            </button>

            {showReviewForm && (
                <div className="review-form">
                    const [hoveredStar, setHoveredStar] = useState(0);

                    <div className="star-rating">
                        {[1,2,3,4,5].map(star => (
                            <span
                                key={star}
                                className={`star ${(star <= (hoveredStar || rating)) ? "filled" : ""}`}
                                onClick={() => handleStarClick(star)}
                                onMouseEnter={() => setHoveredStar(star)}
                                onMouseLeave={() => setHoveredStar(0)}
                            >
                              ★
                            </span>
                        ))}
                    </div>

                    <textarea
                        placeholder="Write your review..."
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                    ></textarea>

                    <button
                        onClick={handleSubmit}
                        disabled={submitting || rating === 0 || !comment.trim()}
                    >
                        {submitting ? "Submitting..." : "Submit Review"}
                    </button>
                </div>
            )}
        </div>
    );
}

export default BookReviews;