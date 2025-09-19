import { useState } from "react";

const useFetchApis = (url) => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [data, setData] = useState(null);

    const fetchApi = async ({
        method = 'GET',
        params,
        query,
        body,
    }) => {
        setLoading(true);
        setError(null);
        let newUrl = url, urlArr = url.split('/');
        if (params) {
            for (let i = 0; i < urlArr.length; i++) {
                if (urlArr[i].startsWith(':')) {
                    const p = urlArr[i].substring(1);
                    urlArr[i] = params[p]
                }
            }
            newUrl = urlArr.join('/');
        }
        try {
            const res = await fetch(newUrl, {
                method,
                headers: { "Content-Type": "application/json" },
                body: body ? JSON.stringify(body) : undefined,
            });

            if (!res.ok) {
                const err = { code: res.status, text: res.statusText };
                setError(err);
                throw err;
            }

            const json = await res.json();
            setData(json);
            return json;
        } catch (err) {
            setError(err);
            throw err;
        } finally {
            setLoading(false);
        }
    };
    
    return [fetchApi, { loading, error, data }];
};

export default useFetchApis;
