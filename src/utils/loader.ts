import { useQuery } from 'react-query';

//const TOKEN = '';

export const authorizedFetch = async <TResponse, TData = unknown>(
  url: string,
  method: 'get' | 'post' = 'get',
  returnMode: 'json' | 'blob' = 'json',
  data?: TData,
): Promise<TResponse> => {
  //  const headersObj = {
  //    Authorization: `Bearer ${TOKEN}`,
  //  };

  const response = await fetch(url, {
    //    headers: headersObj,
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
  `/api/proxy/plugin/hello-console-plugin/forklift-inventory/${relativePath}`;

export function useProviders() {
  return useQuery({
    queryFn: useAuthorizedFetch(getInventoryApiUrl('providers')),
  });
}
