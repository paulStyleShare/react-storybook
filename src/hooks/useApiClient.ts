import { useReducer } from 'react';
import axios, { AxiosError, AxiosInstance, AxiosRequestConfig } from 'axios';

import { baseApiClient } from '~utils/apiClient';

import useDeepCompareEffect from './useDeepCompareEffect';

type Action<P> = {
  type: string;
  payload?: Partial<P>;
};

function init<T = any, E = any>() {
  return {
    data: undefined as T | undefined,
    error: undefined as AxiosError<E> | undefined,
    loading: true,
  };
}
function reducer<S extends ReturnType<typeof init>, A extends Action<S>>(
  state: S,
  action: A,
) {
  switch (action.type) {
    case 'reset':
      // loading이 false일 때에만 새 state를 반환하고 싶습니다.
      if (!state.loading) {
        return {
          data: undefined,
          error: undefined,
          loading: true,
        };
      }
      return state;
    case 'failure':
      return { ...state, error: action.payload, loading: false };
    case 'success':
      return { ...state, data: action.payload, loading: false };
    default:
      return state;
  }
}

const useApiClient = <T = any, E = any>(
  url: string,
  config: Omit<AxiosRequestConfig, 'url'> = {},
  client: AxiosInstance = baseApiClient,
) => {
  const [state, dispatch] = useReducer(reducer, undefined, init);

  useDeepCompareEffect(() => {
    const cancelSource = axios.CancelToken.source();

    async function fetchDataUseApiClient() {
      // Initialize states
      dispatch({ type: 'reset' });

      try {
        const resp = await client.request<T>({
          ...config,
          cancelToken: cancelSource.token,
          url,
        });
        dispatch({ payload: resp.data, type: 'success' });
      } catch (error) {
        if (!axios.isCancel(error)) {
          dispatch({ payload: error as AxiosError<E>, type: 'failure' });
        }
      }
    }

    void fetchDataUseApiClient();

    return () => {
      cancelSource.cancel();
    };
  }, [url, config, client]);

  return state;
};

export default useApiClient;

// Aliased Hooks for GET, POST, PUT, DELETE, PATCH?, HEAD?
// axios에서 기본으로 제공하는 aliases에 기반
// PATCH랑 HEAD는 axios에 있는 메서드긴 한데 쓸 일이 있을지 모르겠어서 일단 작업 안함
export const useApiClientGet = <T = any, E = any>(
  url: string,
  config?: Omit<AxiosRequestConfig, 'url' | 'method'>,
  client?: AxiosInstance,
) => useApiClient<T, E>(url, { ...config, method: 'GET' }, client);
