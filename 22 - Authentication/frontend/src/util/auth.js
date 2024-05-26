import { redirect } from 'react-router-dom';

export const getAuthToken = () => {
    const token = localStorage.getItem('token');

    if (!token) {
        return null;
    }

    const tokenDuration = getTokenDuration();

    if (tokenDuration < 0) {
        return 'EXPIRED';
    }

    return token;
}

export const tokenLoader = () => getAuthToken();

export const checkAuthLoader = () => getAuthToken() ? null : redirect('/auth');

export const getTokenDuration = () => {
    const storedExpirationDate = localStorage.getItem('expiration');
    const expirationDate = new Date(storedExpirationDate);
    const now = new Date();
    const duration = expirationDate.getTime() - now.getTime();
    return duration;
}
