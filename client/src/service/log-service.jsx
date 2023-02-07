import API from '../config/api';

const LogService = {
    error: (error) =>
        API.post('/logs', {
            code: 'application-seller-portal-page-error',
            execution: {
                error,
            },
        }),
};

export default LogService;
