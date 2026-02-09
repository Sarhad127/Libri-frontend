function FavoriteButton({ isFavorite, onToggle }) {
    return (
        <button
            className={`book-favorite-btn ${isFavorite ? 'book-favorite-btn--active' : ''}`}
            onClick={(e) => {
                e.stopPropagation();
                onToggle();
            }}
        >
            {isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}
        </button>
    );
}

export default FavoriteButton;