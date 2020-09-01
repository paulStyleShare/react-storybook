import { GlobalNavbarActionTypes } from './actions';
import * as types from './actionTypes';

export interface GlobalNavbarState {
  theme: string;
}
export const globalNavbarInitialState: GlobalNavbarState = {
  theme: 'black',
};

export default function reducer(
  state = globalNavbarInitialState,
  action: GlobalNavbarActionTypes,
): GlobalNavbarState {
  switch (action.type) {
    case types.CHANGE_THEME:
      return {
        ...state,
        ...action.payload,
      };
    default:
      return state;
  }
}
