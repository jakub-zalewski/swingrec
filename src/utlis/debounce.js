export const makeDebounced  = (functionToDebounce) => {
    let timerId;

    return (...args) => {
        if (timerId) {
            clearTimeout(timerId);
        }
        timerId = setTimeout(() => {
            timerId = null;
            functionToDebounce(...args);
        }, 500);
    }
};
