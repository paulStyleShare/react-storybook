import { OrderedSet } from 'immutable';

import { ActionStatusEnum } from '~schemas/action';
import { NotificationSchema } from '~schemas/notification';

import * as types from './action-types';
import { NotificationActionTypes } from './actions';

export interface NotificationStateData {
  /** 알림 데이터 */
  data: { [key: string]: NotificationSchema };
  /** 알림 키 목록 */
  keys: OrderedSet<string>;
  /** 다음에 fetch할 api 주소 */
  next: string | null;
  /** fetch 상태 */
  status: ActionStatusEnum;
  /** 마지막으로 알림 읽은 시간 */
  readAt: string | null;
  /** 안 읽은 알림 개수 */
  unread: number;
}
export interface NotificationState {
  all: NotificationStateData;
  activity: NotificationStateData;
  event: NotificationStateData;
  marketing: NotificationStateData;
}
export const notificationInitialState: NotificationState = {
  activity: {
    data: {} as NotificationStateData['data'],
    keys: OrderedSet<string>(),
    next: null,
    readAt: null,
    status: ActionStatusEnum.Initial,
    unread: 0,
  },
  all: {
    data: {} as NotificationStateData['data'],
    keys: OrderedSet<string>(),
    next: null,
    readAt: null,
    status: ActionStatusEnum.Initial,
    unread: 0,
  },
  event: {
    data: {} as NotificationStateData['data'],
    keys: OrderedSet<string>(),
    next: null,
    readAt: null,
    status: ActionStatusEnum.Initial,
    unread: 0,
  },
  marketing: {
    data: {} as NotificationStateData['data'],
    keys: OrderedSet<string>(),
    next: null,
    readAt: null,
    status: ActionStatusEnum.Initial,
    unread: 0,
  },
};

export default function reducer(
  state = notificationInitialState,
  action: NotificationActionTypes,
): NotificationState {
  switch (action.type) {
    case types.GET_NOTIFICATIONS_CANCEL: {
      return {
        ...state,
        [action.payload]: {
          ...state[action.payload],
          status: ActionStatusEnum.Cancel,
        },
      };
    }
    case types.GET_NOTIFICATIONS_FAILURE: {
      return {
        ...state,
        [action.payload]: {
          ...state[action.payload],
          status: ActionStatusEnum.Failure,
        },
      };
    }
    case types.GET_NOTIFICATIONS_REQUEST: {
      return {
        ...state,
        [action.payload]: {
          ...state[action.payload],
          status: ActionStatusEnum.Request,
        },
      };
    }
    case types.GET_NOTIFICATIONS_SUCCESS: {
      const {
        type,
        data: { data, paging },
      } = action.payload;
      const prev = state[type];

      return {
        ...state,
        [type]: {
          ...prev,
          data: {
            ...prev.data,
            ...data.reduce(
              (obj, datum) => Object.assign(obj, { [datum.id]: datum }),
              {},
            ),
          },
          keys: prev.keys.concat(data.map(({ id }) => id)),
          next: paging.next,
          status: ActionStatusEnum.Success,
        },
      };
    }
    case types.GET_NOTIFICATIONS_UPSERT: {
      const {
        type,
        data: { data },
      } = action.payload;
      const prev = state[type];

      return {
        ...state,

        [type]: {
          ...prev,

          data: {
            ...prev.data,
            ...data.reduce(
              (obj, datum) => Object.assign(obj, { [datum.id]: datum }),
              {},
            ),
          },
          // 최신 알림을 최상단에 끼워넣음
          keys: OrderedSet(data.map(({ id }) => id)).concat(prev.keys),
          status: ActionStatusEnum.Success,
        },
      };
    }
    default:
      return state;
  }
}
