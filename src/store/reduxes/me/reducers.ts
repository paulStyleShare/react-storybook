import { ActionStatusEnum } from '~schemas/action';
import { GetMeProfileResponse } from '~services/base/me';

import { MeActionTypes } from './actions';
import * as types from './actionTypes';

export interface MeState {
  meData: GetMeProfileResponse | null;
  meFollowData: { [key: string]: boolean };
  meStatus: ActionStatusEnum;
}
export const meInitialState: MeState = {
  meData: null,
  meFollowData: {},
  meStatus: ActionStatusEnum.Initial,
};

export default function reducer(
  state = meInitialState,
  action: MeActionTypes,
): MeState {
  switch (action.type) {
    case types.PUT_ME_FOLLOW_STATE_SUCCESS: {
      return {
        ...state,
        meFollowData: {
          ...state.meFollowData,
          ...action.payload,
        },
      };
    }
    case types.GET_ME_PROFILE_REQUEST:
      return {
        ...state,
        meStatus: ActionStatusEnum.Request,
      };
    case types.GET_ME_PROFILE_FAILURE:
      return {
        ...state,
        meStatus: ActionStatusEnum.Failure,
      };
    case types.GET_ME_PROFILE_SUCCESS: {
      return {
        ...state,
        meData: action.payload,
        meStatus: ActionStatusEnum.Success,
      };
    }
    case types.GET_ME_PROFILE_SKIP:
    case types.PUT_ME_FOLLOW_STATE_SKIP:
    default:
      return state;
  }
}
