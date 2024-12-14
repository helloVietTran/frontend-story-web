import { useEffect } from 'react';

function useDelay(callback, delay, params) {
    useEffect(() => {
        const timerId = setTimeout(() => {
            callback(params);
        }, delay);

        return () => {
            clearTimeout(timerId);
        };
    }, [callback, delay, params]);
}
export default useDelay;