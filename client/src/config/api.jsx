import axios from 'axios';
import * as Authentication from '../helpers/authentication-helper';
import AuthenticationService from '../service/authentication-service';
import Cookies from 'js-cookie';

/* CONFIG */
const api = axios.create({
    baseURL: 'http://localhost:8080/api',
    responseType: 'json',
});

/* RESPONSE INTERCEPTOR */
const UNAUTHORIZED = 401;

api.interceptors.response.use(
    async (response) => {
        if (
            Authentication.isAuthenticated() &&
            !AuthenticationService.isRefreshTokenRequest(response) &&
            !AuthenticationService.waitingRefreshToken()
        ) {
            localStorage.setItem('doRefreshToken', '1');
        }
        return response;
    },
    (error) => {
        const statusCode = error?.response?.status;

        if (statusCode === UNAUTHORIZED) {
            localStorage.removeItem('loggedIn');
            Cookies.remove('Authorization');

            setTimeout(() => {
                window.location = '/';
            }, 5000);
        }
        return Promise.reject(error);
    }
);

/* REQUEST INTERCEPTOR */
api.interceptors.request.use(
    async (config) => {
        const token = AuthenticationService.getCookie('Authorization');

        config.headers = {
            Accept: 'application/json, text/plain, */*',
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json',
        };

        if (Authentication.isAuthenticated()) {
            config.headers.Authorization = `${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default api;
