import * as types from './actionTypes';

export const changeTheme = (theme: string) =>
  ({
    payload: { theme },
    type: types.CHANGE_THEME,
  } as const);

export type GlobalNavbarActionTypes = ReturnType<typeof changeTheme>;
