import { redirect } from 'react-router-dom';

export const getAuthToken = () => {
    const token = localStorage.getItem('token');
    return token;
}

export const tokenLoader = () => getAuthToken();

export const checkAuthLoader = () => getAuthToken() ? null : redirect('/auth');
