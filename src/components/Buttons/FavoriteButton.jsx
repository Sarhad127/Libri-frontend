import '../../styles/FavoriteButton.css';
import { Heart } from 'lucide-react';

function FavoriteButton({ isFavorite, onToggle }) {
    return (
        <button
            className={`book-favorite-btn ${isFavorite ? 'book-favorite-btn--active' : ''}`}
            onClick={(e) => {
                e.stopPropagation();
                onToggle();
            }}
        >
            <Heart
                size={20}
                className={`heart-icon ${isFavorite ? 'active' : ''}`}
            />
        </button>
    );
}

export default FavoriteButton;