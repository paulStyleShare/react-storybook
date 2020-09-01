import { AxiosRequestConfig, AxiosResponse } from 'axios';

import { ApiListResponseBase } from '~schemas/api';
import { NotificationSchema } from '~schemas/notification';
import { PushConfigScheme } from '~schemas/push';
import { UserSchema } from '~schemas/user';
import { baseApiClient } from '~utils/apiClient';
/**
 * 로그인한 사용자의 정보를 가져옴
 *
 * @param {Object=} config axios request config
 */
export function getMeProfile(
  config?: AxiosRequestConfig,
): Promise<AxiosResponse<GetMeProfileResponse>> {
  return baseApiClient.get<GetMeProfileResponse>('/me/profile', config);
}
export interface GetMeProfileResponse {
  admin: boolean;
  bio: string;
  birthdate: string;
  collectionsCount: number;
  country: string;
  createdAt: string;
  email: string;
  facebookPublish: boolean;
  feedGroup: null; // TODO: check type
  followersCount: number;
  followingsCount: number;
  gender: 'female' | 'male';
  id: number;
  isDormant?: boolean;
  isOfficial: boolean;
  likesCount: number;
  linkEnabled: boolean;
  locale: string;
  nickname: string;
  occupation: string;
  profileCoverId: number | null; // TODO: check type
  profilePictureId: number | null; // TODO: check type
  uploadedStylesCount: number;
  username: string;
  website: string;
}

export const GET_ME_CART_COUNT = '/me/cart/count';

export const GET_ME_USER_FOLLOWING = '/me/followings';

export interface GetMeCartCountResponse {
  count: number;
}

/**
 * 읽지 않은 알림 개수를 가져옴
 *
 * @param {Object=} config axios request config
 */
export const getMeNotificationsCount = (
  config?: AxiosRequestConfig,
): Promise<AxiosResponse<GetNotificationCountResponse>> =>
  baseApiClient.get<GetNotificationCountResponse>(
    '/me/notifications/unread-count',
    config,
  );
export interface GetNotificationCountResponse {
  data: number;
  lastNotificationsReadAt: string;
}

/**
 * 사용자의 노티를 가져옴
 *
 * @param {Object=} params api parameters
 * @param {number=} params.limit 최대 노티 개수
 * @param {number=} params.offset 몇번째 노티부터..
 * @param {string=} params.type 활동만 혹은 프로모션만 불러올지
 * @param {Object=} config axios request config
 */
export const getMeNotifications = (
  params?: GetNotificationsParams,
  config?: AxiosRequestConfig,
): Promise<AxiosResponse<GetNotificationsResponse>> =>
  baseApiClient.get<GetNotificationsResponse>('/me/notifications', {
    ...config,
    params,
  });
export interface GetNotificationsParams {
  limit?: number;
  offset?: number;
  type?: 'ACTIVITY' | 'EVENT' | 'MARKETING';
}
export interface GetNotificationsResponse extends ApiListResponseBase {
  data: NotificationSchema[];
}

/**
 * 모든 알림 읽기 처리
 *
 * @param {Object=} params api parameters
 * @param {string=} params.type 특정 타입의 알람을 읽음 처리
 * @param {Object=} config axios request config
 */
export const putMeNotificationsRead = (
  params?: PutNotificationsAllReadParams,
  config?: AxiosRequestConfig,
): Promise<AxiosResponse<PutNotificationsAllReadResponse>> => {
  const data = new FormData();

  if (params) {
    Object.entries(params).map(([key, value]) => {
      data.append(key, value);
    });
  }

  return baseApiClient.put<PutNotificationsAllReadResponse>(
    '/me/notifications/mark-all-as-read',
    data,
    {
      ...config,
      headers: {
        ...(config?.headers as Record<string, unknown>),
        'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8',
      },
    },
  );
};
export interface PutNotificationsAllReadParams {
  type?: 'EVENT' | 'MARKETING';
}
export interface PutNotificationsAllReadResponse {
  lastNotificationsReadAt: string;
}

/**
 * 사용자 팔로우하기
 *
 * @param {string} username 팔로우할 사용자 이름
 * @param {Object=} config axios request config
 */
export function putMeUserFollowing(
  username: string,
  config?: AxiosRequestConfig,
): Promise<AxiosResponse<GetFollowingResponse>> {
  return baseApiClient.put<GetFollowingResponse>(
    `/me/followings/${username}`,
    null,
    config,
  );
}
export interface GetFollowingResponse {
  total: number;
  data: UserSchema[];
}

/**
 * 사용자 팔로우 취소
 *
 * @param {string} username 팔로우 취소할 사용자 이름
 * @param {Object=} config axios request config
 */
export function deleteMeUserFollowing(
  username: string,
  config?: AxiosRequestConfig,
): Promise<AxiosResponse<any>> {
  return baseApiClient.delete(`/me/followings/${username}`, config);
}

/**
 * 사용자 팔로우 상태값 받기
 *
 * @param {number[] | string[]} userIds 팔로우 상태를 체크할 userId들
 * @param {Object=} config axios request config
 */
export function getFollowingStatus(
  userIds: (number | string)[],
  config?: AxiosRequestConfig,
): Promise<AxiosResponse<GetFollowingStatusResponse>> {
  const params = {
    user_ids: userIds.join(','),
  };

  return baseApiClient.get<GetFollowingStatusResponse>(
    '/api/following-statuses',
    { ...config, params },
  );
}
export interface GetFollowingStatusResponse {
  [key: string]: boolean;
}

/**
 * Add to cart
 */
export const PUT_ME_CART = '/me/cart';
export interface MeCartData {
  cartId?: string;
  goodsId: number;
  quantity: number;
  values: string[];
}
export interface PutMeCartParams {
  data: MeCartData[];
}

/**
 * Get my point
 */
export const GET_ME_POINT = '/me/point/balance';
export interface GetMePointResponse {
  data: number;
}

/**
 * get metadata
 *
 * @param {string} key metadata key
 * @param {Object=} config axios request config
 */
export const getMetadata = (
  key: string,
  config?: AxiosRequestConfig,
): Promise<AxiosResponse<{ data: null | string }>> =>
  baseApiClient.get<{ data: null | string }>(`/me/metadata/${key}`, config);

/**
 * put metadata
 *
 * @param {string} key metadata key
 * @param {any} value any kind of value
 * @param {Object=} config axios request config
 */
export const putMetadata = (
  key: string,
  value: unknown,
  config?: AxiosRequestConfig,
): Promise<AxiosResponse<any>> => {
  const data = new FormData();
  data.append(
    'value',
    typeof value === 'string' ? value : JSON.stringify(value),
  );

  return baseApiClient.put(`/me/metadata/${key}`, data, {
    ...config,
    headers: {
      ...(config?.headers as Record<string, unknown>),
      'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8',
    },
  });
};

/**
 * 전체 푸쉬 동의여부를 가져옴
 *
 * @param config
 */
export function getMePushConfig(
  config?: AxiosRequestConfig,
): Promise<AxiosResponse<GetMePushConfigResponse>> {
  return baseApiClient.get<GetMePushConfigResponse>(
    '/me/notification/push-configuration',
    config,
  );
}
export interface GetMePushConfigResponse {
  conditions: PushConfigScheme[];
}

/**
 * 마케팅 푸시 동의여부를 가져옴
 *
 * @param {Object=} config axios request config
 */
export function getMePushConfigMarketing(
  config?: AxiosRequestConfig,
): Promise<AxiosResponse<GetMePushConfigMarketingResponse>> {
  return baseApiClient.get<GetMePushConfigMarketingResponse>(
    '/me/notification/push-configuration/marketing',
    config,
  );
}
export interface GetMePushConfigMarketingResponse {
  conditionIdentifier: 'marketing';
  default: boolean;
  state: boolean;
  verbose: string;
}

/**
 * 푸시 수신 설정 변경
 *
 * @param {Object} params 설정을 변경할 identifier와 boolean 값
 * @param {Object=} config axios request config
 */
export function postMePushConfig(
  params: {
    [key: string]: 'on' | 'off';
  },
  config?: AxiosRequestConfig,
): Promise<AxiosResponse<any>> {
  return baseApiClient.post(
    '/me/notification/push-configuration',
    params,
    config,
  );
}
