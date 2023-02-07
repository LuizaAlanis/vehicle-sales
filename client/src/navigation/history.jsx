import { createBrowserHistory } from "history";

const browserHistory = createBrowserHistory();

browserHistory.listen((location) => {
    const { hash } = location;
    if (hash !== '') {
        setTimeout(() => {
            const id = hash.replace('#', '');
            const element = document.getElementById(id);
            if (element) {
                element.scrollIntoView();
            }
        }, 0);
    }
});

export default browserHistory;
