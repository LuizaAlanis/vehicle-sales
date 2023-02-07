export const APPLICATION_STATE_KEY = '@application-state';

const StorageHelper = {
    loadStateFromLocalStorage: () => {
        try {
            const serializedState = localStorage.getItem(APPLICATION_STATE_KEY);
            if (serializedState === null) {
                return undefined;
            }
            return JSON.parse(serializedState);
        } catch (err) {
            return undefined;
        }
    },

    saveStateToLocalStorage: (state) => {
        try {
            const serializedState = JSON.stringify(state);
            localStorage.setItem(APPLICATION_STATE_KEY, serializedState);
        } catch (err) {
            console.log(err)
        }
    },

    removeStateStorage: () => {
        try {
            localStorage.removeItem(APPLICATION_STATE_KEY);
        } catch (err) {
            console.log(err)
        }
    },
};

export default StorageHelper;
