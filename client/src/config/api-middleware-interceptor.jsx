import { RSAA } from 'redux-api-middleware';

export default function ApiMiddlewareInterceptor() {
    return function (next) {
        return function (action) {
            const callApi = action[RSAA];

            const baseURL = `${
                process.env.REACT_APP_ENV === 'dev' ? 'http://localhost:9090' : ''
            }`;
            callApi.endpoint = baseURL + callApi.endpoint;

            var oauth2Token = (document.cookie.match(
                new RegExp('(^| )oauth2Token=([^;]+)')
            ) || [, null])[2];
            // Check if this action is a redux-api-middleware action.
            if (callApi && oauth2Token && oauth2Token != '') {
                // Inject the Authorization header from localStorage.
                callApi.headers = Object.assign({}, callApi.headers, {
                    Authorization: 'Bearer ' + oauth2Token,
                });
            }

            // Pass the FSA to the next action.
            return next(action);
        };
    };
}
