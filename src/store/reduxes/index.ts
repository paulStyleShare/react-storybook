import { combineReducers } from 'redux';

import { GlobalNavbarActionTypes } from './global-navbar/actions';
import globalNavbar, {
  globalNavbarInitialState,
  GlobalNavbarState,
} from './global-navbar/reducers';
import { MeActionTypes } from './me/actions';
import me, { meInitialState, MeState } from './me/reducers';
import { NotificationActionTypes } from './notification/actions';
import notification, {
  notificationInitialState,
  NotificationState,
} from './notification/reducers';

export interface RootState {
  globalNavbar: GlobalNavbarState;
  me: MeState;
  notification: NotificationState;
}
export type RootAction = MeActionTypes &
  GlobalNavbarActionTypes &
  NotificationActionTypes;

export const rootState: RootState = {
  globalNavbar: globalNavbarInitialState,
  me: meInitialState,
  notification: notificationInitialState,
};
export const rootReducer = combineReducers<RootState>({
  globalNavbar,
  me,
  notification,
});
