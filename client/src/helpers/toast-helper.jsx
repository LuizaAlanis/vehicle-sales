import { toast } from "react-toastify";
import { getI18n } from 'react-i18next';

let I18n = getI18n();

const ToastHelper = {
    /**
     * @description - Shows a warning toast.
     * @param {string} message - The message to be displayed.
     */
    showWarning: (message) => {
        toast(message, {
            type: toast.TYPE.WARNING,
            autoClose: 5000,
            theme: 'colored',
            position: 'bottom-right',
        });
    },

    /**
     * @description - Shows an error toast.
     * @param {string} message - The message to be displayed.
     */
    showError: (message) => {
        toast(message, {
            type: toast.TYPE.ERROR,
            autoClose: 5000,
            theme: 'colored',
            position: 'bottom-right',
        });
    },

    /**
     * @description - Shows a success toast.
     * @param {string} message - The message to be displayed.
     */
    showSuccess: (message) => {
        toast(message, {
            type: toast.TYPE.SUCCESS,
            autoClose: 5000,
            theme: 'colored',
            position: 'bottom-right',
        });
    },

    /**
     * @description - Shows an info toast.
     * @param {string} message - The message to be displayed.
     */
    showInfo: (message) => {
        toast(message, {
            type: toast.TYPE.INFO,
            autoClose: 5000,
            theme: 'colored',
            position: 'bottom-right',
        });
    },

    /**
     * @description - Shows a loading toast with success and error messages.
     * @template T
     * @param {Promise<T> | (() => Promise<T>)} promise - The promise to be resolved.
     * @param {Object | undefined} params
     * @param {string | undefined} params.pending - The message to be displayed while loading.
     * @param {Object | undefined} params.error - Messages if the promise fails.
     * @param {string | undefined} params.error.message - Default error message.
     * @param {string | undefined} params.error.notFound - Error message for not found status code.
     * @param {string | undefined} params.success - The message to be displayed if the promise succeeds.
     * @returns {Promise<T>} - The promise result.
     */
    showLoading: async (promise, params) => {
        return await toast.promise(promise, {
                pending: params?.pending,
                error: {
                    render({ data }) {
                        const statusCode = data?.response?.status

                        if (statusCode === 404) {
                            return params?.error?.notFound || I18n.t('toast_helper.not_found')
                        } else if (statusCode === 403) {
                            return I18n.t('toast_helper.forbidden')
                        }
                        return params?.error?.message || I18n.t('toast_helper.try_later')
                    }
                },
                success: params?.success
            },
            {
                theme: 'colored',
                autoClose: 3000,
                position: 'bottom-right',
            })
    },
}

export default ToastHelper;
