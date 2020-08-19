import { Reducer, useReducer } from 'react';
import axios, { AxiosError, AxiosResponse } from 'axios';

import useDeepCompareEffect from './useDeepCompareEffect';

type Action = {
  type: string;
  payload?: unknown;
};

function init<T, E extends unknown = undefined>() {
  return {
    data: undefined as T | undefined,
    error: undefined as AxiosError<E> | undefined,
    loading: true,
  };
}
function reducer<S extends ReturnType<typeof init>, A extends Action>(
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
    case 'cancel':
    default:
      return state;
  }
}

const useApi = <T, E extends unknown = undefined>(
  api: (...args: any[]) => Promise<AxiosResponse<T>>,
  ...args: any[]
) => {
  const [state, dispatch] = useReducer<
    Reducer<
      {
        data: T | undefined;
        error: AxiosError<E> | undefined;
        loading: boolean;
      },
      | { type: 'reset' }
      | { type: 'cancel' }
      | { type: 'failure'; payload: AxiosError<E> }
      | { type: 'success'; payload: T }
    >,
    undefined
  >(reducer, undefined, init);

  useDeepCompareEffect(() => {
    const cancelSource = axios.CancelToken.source();

    async function fetchDataUseApiClient() {
      // Initialize states
      dispatch({ type: 'reset' });

      try {
        const resp = await api(...args, { cancelToken: cancelSource.token });
        dispatch({ payload: resp.data, type: 'success' });
      } catch (error) {
        if (!axios.isCancel(error)) {
          dispatch({ payload: error as AxiosError<E>, type: 'failure' });
        } else {
          dispatch({ type: 'cancel' });
        }
      }
    }

    void fetchDataUseApiClient();

    return () => {
      cancelSource.cancel();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, args);

  return state;
};

export default useApi;
