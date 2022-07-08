import { useQuery } from 'react-query';

const TOKEN = '';

export const authorizedFetch = async <TResponse, TData = unknown>(
  url: string,
  method: 'get' | 'post' = 'get',
  returnMode: 'json' | 'blob' = 'json',
  data?: TData,
): Promise<TResponse> => {
  const headersObj = {
    Authorization: `Bearer ${TOKEN}`,
  };

  const response = await fetch(url, {
    headers: headersObj,
    method,
    ...(data &&
      method !== 'get' && {
        body: JSON.stringify(data),
      }),
  });
  if (response.ok && response.json) {
    return returnMode === 'json' ? response.json() : response.blob();
  } else {
    throw response;
  }
};

export const useAuthorizedFetch = <T>(url: string): any => {
  return () => authorizedFetch(url);
};

export const getInventoryApiUrl = (relativePath: string): string =>
  `/inventory-api/${relativePath}`;

const PROVIDER = '';

export function useVms() {
  return useQuery({
    queryFn: useAuthorizedFetch(getInventoryApiUrl(`${PROVIDER}/vms?detail=1`)),
  });
}
