import {
  useState,
  useCallback,
} from 'react';

export function useApi(
  api,
  params,
) {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  const apiCallback = useCallback(
    () => {
      setLoading(true);

      api({
        ...params,
      }).then((d) => {
        setData(d);
        setLoading(false);
      }).catch((e) => {
        console.error(e);
        setError(e);
        setLoading(false);
      });
    },
    [api, params],
  );

  const apiResponse = {
    loading,
    data,
    error,
  };

  return [apiResponse, apiCallback];
}
