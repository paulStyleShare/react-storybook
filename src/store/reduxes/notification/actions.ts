import Axios, { AxiosRequestConfig } from 'axios';
import { ThunkAction } from 'redux-thunk';

import {
  getMeNotifications,
  GetNotificationsParams,
  GetNotificationsResponse,
} from '~services/base/me';
import { baseApiClient } from '~utils/apiClient';

import * as types from './action-types';
import { RootState } from '..';

/* *****************************************
 * get default notification actions
 * ***************************************/

type NotificationType = 'activity' | 'event' | 'all' | 'marketing';

export const getNotificationsCancel = (payload: NotificationType) =>
  ({
    payload,
    type: types.GET_NOTIFICATIONS_CANCEL,
  } as const);
export const getNotificationsRequest = (payload: NotificationType) =>
  ({
    payload,
    type: types.GET_NOTIFICATIONS_REQUEST,
  } as const);
export const getNotificationsFailure = (payload: NotificationType) =>
  ({ payload, type: types.GET_NOTIFICATIONS_FAILURE } as const);
export const getNotificationsSuccess = (payload: {
  type: NotificationType;
  data: GetNotificationsResponse;
}) =>
  ({
    payload,
    type: types.GET_NOTIFICATIONS_SUCCESS,
  } as const);
export const getNotificationsUpsert = (payload: {
  type: NotificationType;
  data: GetNotificationsResponse;
}) =>
  ({
    payload,
    type: types.GET_NOTIFICATIONS_UPSERT,
  } as const);

export type GetNotificationActionCreators =
  | typeof getNotificationsCancel
  | typeof getNotificationsFailure
  | typeof getNotificationsRequest
  | typeof getNotificationsSuccess
  | typeof getNotificationsUpsert;
type GetNotificationsActionTypes = ReturnType<GetNotificationActionCreators>;

export const getNotifications = (
  params?: GetNotificationsParams,
  config?: AxiosRequestConfig,
): ThunkAction<
  Promise<GetNotificationsActionTypes>,
  RootState,
  null,
  GetNotificationsActionTypes
> => async (dispatch) => {
  const type = (
    params?.type || ('all' as const)
  ).toLowerCase() as NotificationType;

  dispatch(getNotificationsRequest(type));

  try {
    const { data } = await getMeNotifications(params, config);

    return dispatch(getNotificationsSuccess({ data, type }));
  } catch (error) {
    if (Axios.isCancel(error)) {
      return dispatch(getNotificationsCancel(type));
    }
    return dispatch(getNotificationsFailure(type));
  }
};

export const loadNotifications = (
  type: NotificationType,
  next: string | null,
  config?: AxiosRequestConfig,
): ThunkAction<
  Promise<GetNotificationsActionTypes>,
  RootState,
  null,
  GetNotificationsActionTypes
> => async (dispatch) => {
  if (!next) {
    return dispatch(getNotificationsCancel(type));
  }

  dispatch(getNotificationsRequest(type));

  try {
    const { data } = await baseApiClient.get<GetNotificationsResponse>(
      next,
      config,
    );

    return dispatch(getNotificationsSuccess({ data, type }));
  } catch (error) {
    if (Axios.isCancel(error)) {
      return dispatch(getNotificationsCancel(type));
    }
    return dispatch(getNotificationsFailure(type));
  }
};

export const upsertNotifications = (
  params?: GetNotificationsParams,
  config?: AxiosRequestConfig,
): ThunkAction<
  Promise<GetNotificationsActionTypes>,
  RootState,
  null,
  GetNotificationsActionTypes
> => async (dispatch) => {
  const type = (
    params?.type || ('all' as const)
  ).toLowerCase() as NotificationType;

  try {
    const { data } = await getMeNotifications(params, config);

    return dispatch(getNotificationsUpsert({ data, type }));
  } catch (error) {
    if (Axios.isCancel(error)) {
      return dispatch(getNotificationsCancel(type));
    }
    return dispatch(getNotificationsFailure(type));
  }
};

export type NotificationActionTypes = GetNotificationsActionTypes;
