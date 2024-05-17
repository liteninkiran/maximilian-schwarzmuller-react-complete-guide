import { useCallback, useEffect, useState } from 'react';

const message = 'Something went wrong, failed to send request.';

const sendHttpRequest = async (url, config) => {
    const response = await fetch(url, config);
    const resData = await response.json();
    if (!response.ok) {
        throw new Error(resData.message || message);
    }
    return resData;
}

const useHttp = (url, config, initialData) => {
    const [data, setData] = useState(initialData);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState();
    const clearData = () => setData(initialData);
    const sendRequestFn = async data => {
        setIsLoading(true);
        try {
            const options = { ...config, body: data }
            const resData = await sendHttpRequest(url, options);
            setData(resData);
        } catch (error) {
            setError(error.message || message);
        }
        setIsLoading(false);
    }
    const sendRequest = useCallback(sendRequestFn, [url, config]);

    useEffect(() => {
        const configMethod = config && (config.method === 'GET' || !config.method);
        if (configMethod || !config) {
            sendRequest();
        }
    }, [sendRequest, config]);

    return { data, isLoading, error, sendRequest, clearData };
}

export default useHttp;
