import Cookies from 'js-cookie';

export const isAuthenticated = () => {
    const token = Cookies.get('oauth2Token');
    if (token == null) {
        return false;
    }
    const loggedIn = localStorage.getItem('loggedIn');

    return loggedIn && loggedIn === 'true';
};