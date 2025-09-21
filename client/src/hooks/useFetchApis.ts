import { useState } from 'react';

type FetchArgs = {
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE';
  params?: Record<string, string>;
  body?: Record<string, unknown>;
};

export type FetchFunc = (data: FetchArgs) => unknown;

const useFetchApis = (
  url: string
): [
  FetchFunc,
  { loading: boolean; error: { code: number; text: string } | null; data: unknown },
] => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<{ code: number; text: string } | null>(null);
  const [data, setData] = useState(null);

  const fetchApi = async (arg?: FetchArgs) => {
    const { method, params, body } = arg || {};
    setLoading(true);
    setError(null);
    let newUrl = url,
      urlArr = url.split('/');
    if (params) {
      for (let i = 0; i < urlArr.length; i++) {
        if (urlArr[i].startsWith(':')) {
          const p = urlArr[i].substring(1);
          urlArr[i] = params[p];
        }
      }
      newUrl = urlArr.join('/');
    }
    try {
      const res = await fetch(newUrl, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: body ? JSON.stringify(body) : undefined,
      });

      if (!res.ok) {
        const err = { code: res.status, text: res.statusText };
        setError(err);
        throw err;
      }

      const text = await res.text();
      const json = text ? JSON.parse(text) : null;
      setData(json);
      return json;
    } catch (err) {
      setError(err as { code: number; text: string });
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return [fetchApi, { loading, error, data }];
};

export default useFetchApis;
