import { Action, applyMiddleware, compose, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';

import { rootReducer, RootState, rootState } from './reduxes';

export default function configureStore(
  state = rootState,
): ReturnType<typeof createStore> {
  return createStore<
    RootState,
    Action<any>,
    Record<string, unknown>,
    Record<string, unknown>
  >(
    rootReducer,
    state,
    process.env.NODE_ENV === 'production'
      ? compose(applyMiddleware(thunk))
      : // eslint-disable-next-line @typescript-eslint/no-unsafe-call
        composeWithDevTools(applyMiddleware(thunk)),
  );
}
