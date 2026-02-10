import { useState, useEffect } from "react";
import { createReview, fetchBookReviews, updateReview } from "../services/api.js";
import '../styles/BookReviews.css';

function BookReviews({ bookId, token}) {
    const [reviews, setReviews] = useState([]);
    const [showReviewForm, setShowReviewForm] = useState(false);
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState('');
    const [submitting, setSubmitting] = useState(false);
    const [hoveredStar, setHoveredStar] = useState(0);
    const [editingReviewId, setEditingReviewId] = useState(null);

    const storedUser = JSON.parse(localStorage.getItem('user'));
    const currentUserId = storedUser?.id;

    const userReview = reviews.find(r => r.userId === currentUserId);
    const canReview = !userReview;

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
            alert("You must be logged in");
            return;
        }

        if (rating === 0 || !comment.trim()) {
            alert("Please provide a rating and comment.");
            return;
        }

        setSubmitting(true);

        try {
            let savedReview;

            if (editingReviewId) {
                savedReview = await updateReview(
                    token,
                    editingReviewId,
                    rating,
                    comment
                );
            } else {
                savedReview = await createReview(token, {
                    bookId,
                    rating,
                    comment
                });
            }

            setReviews(prev =>
                editingReviewId
                    ? prev.map(r => r.id === editingReviewId ? savedReview : r)
                    : [savedReview, ...prev]
            );

            setShowReviewForm(false);
            setRating(0);
            setComment('');
            setEditingReviewId(null);

        } catch (err) {
            alert(err.message);
        } finally {
            setSubmitting(false);
        }
    };

    const handleEdit = (review) => {
        setShowReviewForm(true);
        setRating(review.rating);
        setComment(review.comment);
        setEditingReviewId(review.id);
    };

    return (
        <div className="reviews-section">

            {token && (
                <div className="write-review-button-wrapper">
                    {token && canReview && (
                        <div className="write-review-button-wrapper">
                            <button
                                className="write-review-button"
                                onClick={() => {
                                    setShowReviewForm(!showReviewForm);
                                    setEditingReviewId(null);
                                    setRating(0);
                                    setComment('');
                                }}
                            >
                                {showReviewForm ? "Cancel" : "Write a Review"}
                            </button>
                        </div>
                    )}
                </div>
            )}

            {showReviewForm && (
                <div className="review-form">
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
                        {submitting ? "Submitting..." : editingReviewId ? "Update Review" : "Submit Review"}
                    </button>
                </div>
            )}

            <h3>Reviews</h3>

            <p className="review-summary">
                {reviews.length} review(s) • Average rating:{" "}
                {(reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1)} ⭐
            </p>

            {reviews.length > 0 ? (
                <div className="reviews-list">
                    {reviews.map((review) => (
                        <div key={review.id} className="review-card">
                            <div className="review-header">
                                <span className="review-user">{review.firstName || "Anonymous"}</span>

                                <div className="update-edit-rating-wrapper">
                                    {review.userId === currentUserId && (
                                        <button
                                            className="edit-review-button"
                                            onClick={() => handleEdit(review)}
                                        >
                                            Edit
                                        </button>
                                    )}
                                    <span className="review-rating">
                                    {"★".repeat(review.rating)}
                                        {"☆".repeat(5 - review.rating)}
                                    </span>
                                </div>

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
            ) : (
                <p className="no-reviews">No reviews yet. Be the first to review this book.</p>
            )}
        </div>
    );
}

export default BookReviews;