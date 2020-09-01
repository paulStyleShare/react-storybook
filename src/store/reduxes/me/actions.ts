import * as Sentry from '@sentry/browser';
import Axios, { AxiosError, AxiosResponse } from 'axios';
import { ThunkAction } from 'redux-thunk';

import { ActionStatusEnum } from '~schemas/action';
import {
  getFollowingStatus,
  getMeProfile as api,
  GetMeProfileResponse,
} from '~services/base/me';
import { isProduction } from '~utils/environment';
import { captureException } from '~utils/sentry';

import * as types from './actionTypes';
import { RootState } from '../index';

/* *****************************************
 * profile actions
 * ***************************************/

export const getMeProfileSuccess = (payload: GetMeProfileResponse) =>
  ({
    payload,
    type: types.GET_ME_PROFILE_SUCCESS,
  } as const);
export const getMeProfileFailure = () =>
  ({
    type: types.GET_ME_PROFILE_FAILURE,
  } as const);
export const getMeProfileRequest = () =>
  ({
    type: types.GET_ME_PROFILE_REQUEST,
  } as const);
export const getMeProfileSkip = () =>
  ({ type: types.GET_ME_PROFILE_SKIP } as const);

type GetMeProfileActionTypes = ReturnType<
  | typeof getMeProfileFailure
  | typeof getMeProfileRequest
  | typeof getMeProfileSkip
  | typeof getMeProfileSuccess
>;

/**
 * 사용자 정보를 불러옴
 */
export const getMeProfile = (): ThunkAction<
  Promise<GetMeProfileActionTypes>,
  RootState,
  null,
  GetMeProfileActionTypes
> => async (dispatch, getState) => {
  const {
    me: { meStatus },
  } = getState();

  if (meStatus !== ActionStatusEnum.Initial) {
    // 이미 초기화되었으므로 호출하지 않는다.
    return dispatch(getMeProfileSkip());
  }

  dispatch(getMeProfileRequest());

  try {
    const { data } = await api();
    const { id, email, birthdate, country, gender, username, locale } = data;

    dataLayer.push({
      event: 'setUserId',
      userId: id,
    });
    dataLayer.push({
      event: 'setUserProperties',
      userProperties: {
        birthyear: birthdate ? birthdate.slice(0, 4) : null,
        country,
        gender,
      },
    });
    dataLayer.push({
      email,
    });

    if (isProduction) {
      Sentry.configureScope((scope: Sentry.Scope) => {
        scope.setUser({
          country,
          email,
          id: typeof id !== 'undefined' ? id.toString() : id,
          locale,
          username,
        });
      });
    }

    return dispatch(getMeProfileSuccess(data));
  } catch (error) {
    if (
      error &&
      (error as AxiosError).response &&
      ((error as AxiosError).response as AxiosResponse).status !== 401 &&
      !Axios.isCancel(error)
    ) {
      captureException(error);
    }

    return dispatch(getMeProfileFailure());
  }
};

/* *****************************************
 * follow actions
 * ***************************************/

export const putMeFollowStateSuccess = (payload: {
  [key: string]: boolean;
}): {
  payload: { [key: string]: boolean };
  type: typeof types.PUT_ME_FOLLOW_STATE_SUCCESS;
} => ({
  payload,
  type: types.PUT_ME_FOLLOW_STATE_SUCCESS,
});

export const putMeFollowStateSkip = (): {
  type: typeof types.PUT_ME_FOLLOW_STATE_SKIP;
} => ({
  type: types.PUT_ME_FOLLOW_STATE_SKIP,
});

type PutMeFollowStateActionTypes = ReturnType<
  typeof putMeFollowStateSuccess | typeof putMeFollowStateSkip
>;

/**
 * 현재 팔로우 목록에 있는 팔로우 상태 데이터를 새로고침한다.
 */
export const refreshMeFollowState = (): ThunkAction<
  Promise<PutMeFollowStateActionTypes>,
  RootState,
  null,
  PutMeFollowStateActionTypes
> => async (dispatch, getState) => {
  const {
    me: { meFollowData },
  } = getState();

  try {
    const users = Object.keys(meFollowData);

    if (users.length === 0) {
      return dispatch(putMeFollowStateSkip());
    }

    const { data } = await getFollowingStatus(users);

    return dispatch(putMeFollowStateSuccess(data));
  } catch {
    return dispatch(putMeFollowStateSuccess({}));
  }
};

/**
 * Me Action Types
 */
export type MeActionTypes =
  | GetMeProfileActionTypes
  | PutMeFollowStateActionTypes;
