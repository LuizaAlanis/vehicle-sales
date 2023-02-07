import { applyMiddleware, createStore } from 'redux';
import logger from 'redux-logger';
import ApiMiddlewareInterceptor from '../config/api-middleware-interceptor';
import StorageHelper from '../helpers/storage-helper';

let middlewareToApply = null;
if (process.env.NODE_ENV !== 'development') {
    middlewareToApply = applyMiddleware(ApiMiddlewareInterceptor);
} else {
    // eslint-disable-next-line no-unused-vars
    middlewareToApply = applyMiddleware(
        ApiMiddlewareInterceptor,
        logger
    );
}

export default createStore(
    StorageHelper.loadStateFromLocalStorage(),
    applyMiddleware(ApiMiddlewareInterceptor, logger)
);
