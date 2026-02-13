import '../styles/FavoriteButtonText.css'
import React from 'react';

function FavoriteButtonText({ isFavorite, onToggle }) {
    return (
        <button
            className="favorite-text-btn"
            onClick={(e) => {
                e.stopPropagation();
                onToggle();
            }}
        >
            {isFavorite ? 'Remove from favorites' : 'Add as favorite'}
        </button>
    );
}

export default FavoriteButtonText;