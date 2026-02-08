const API_BASE_URL = 'http://localhost:8080/api';

export async function loginUser(email, password) {
    const response = await fetch(`${API_BASE_URL}/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
        throw new Error('Login failed');
    }

    return response.json();
}

export async function registerUser(userData) {
    const response = await fetch(`${API_BASE_URL}/register`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Registration failed');
    }

    return response.json();
}

export async function fetchUserProfile(token) {
    const response = await fetch(`${API_BASE_URL}/me`, {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    if (!response.ok) {
        throw new Error('Failed to fetch user profile');
    }

    return response.json();
}

export async function fetchBooks() {
    const response = await fetch(`${API_BASE_URL}/books`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });

    if (!response.ok) {
        throw new Error('Failed to fetch books');
    }

    return response.json();
}

export async function createReview(token, reviewData) {
    const response = await fetch(`${API_BASE_URL}/reviews`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(reviewData),
    });

    if (!response.ok) {
        throw new Error('Failed to create review');
    }

    return response.json();
}

export async function fetchBookReviews(bookId) {
    const response = await fetch(`${API_BASE_URL}/${bookId}/reviews`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });

    if (!response.ok) {
        throw new Error('Failed to fetch reviews');
    }

    return response.json();
}

export async function addFavorite(token, bookId) {
    const response = await fetch(`${API_BASE_URL}/favorites/${bookId}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
    });

    if (!response.ok) {
        throw new Error('Failed to add favorite');
    }

    return response.json();
}

export async function removeFavorite(token, bookId) {
    const response = await fetch(`${API_BASE_URL}/favorites/${bookId}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
    });

    if (!response.ok) {
        throw new Error('Failed to remove favorite');
    }

    return response.json();
}

export async function fetchFavorites(token) {
    const response = await fetch(`${API_BASE_URL}/favorites`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
    });

    if (!response.ok) {
        throw new Error('Failed to fetch favorites');
    }

    return response.json();
}