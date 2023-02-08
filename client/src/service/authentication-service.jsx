import API from '../config/api';
import * as Authentication from '../helpers/authentication-helper';
import Cookies from 'js-cookie';
import {inflate} from "pako"

const REFRESH_TIMEOUT = 300000;

const AuthenticationService = {
    waitingRefreshToken: () => {
        return localStorage.getItem('doRefreshToken') === '1';
    },
    isRefreshTokenRequest: (response) => {
        return response.config.url === '/api/authenticate/refresh_token';
    },

    refreshToken: () => {
        if (Authentication.isAuthenticated()) {
            setTimeout(() => {
                if (AuthenticationService.waitingRefreshToken()) {
                    API.put('/login/refresh_token').then(
                        (response) => {
                            localStorage.setItem('doRefreshToken', '0');
                        },
                        (error) => {
                            localStorage.setItem('doRefreshToken', '1');
                        }
                    );
                }
                AuthenticationService.refreshToken();
            }, REFRESH_TIMEOUT); // 5 minutes
        }
    },

    setCookie: (cookieName) => {
        return Cookies.set(cookieName);
    },

    getCookie: (cookieName) => {
        return Cookies.get(cookieName);
    },

    decodeAndInflateToken: (oauth2Token) => {
        const compressedToken = AuthenticationService.decodeAndInflateToken(oauth2Token);
        if (compressedToken.authorities) {
            return compressedToken; // Not compressed, possible old auth version
        }
        const compressedBody = atob(compressedToken.compressed)
        const compressedBodyBin = Uint8Array.from(compressedBody, c => c.charCodeAt(0))
        const bodyBin = inflate(compressedBodyBin, {to: 'string'})
        return JSON.parse(bodyBin);
    },

    authenticate(username, password) {
        return API.post(
            '/login',
            {username, password},
            {
                headers: {
                    'Content-Type': 'application/json',
                },
            }
        );
    },

    logout() {
        return API.delete('/login/logout', {
            headers: {
                'Content-Type': 'application/json',
                'SuperSim-Persistent-Log': JSON.stringify({
                    device: {kind: 1, code: null},
                }),
            },
        });
    },
};

export default AuthenticationService;
