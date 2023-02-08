import Cookies from 'js-cookie';

export const isAuthenticated = () => {
    const token = Cookies.get('Authorization');
    return token != null;
};