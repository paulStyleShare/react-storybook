export enum AppCommonEnum {
  SET_ANALYTICS_INFORMATION = 'setAnalyticsInformation',
  START_LOADING = 'startLoading', // start native loading spinner
  STOP_LOADING = 'stopLoading', // stop native loading spinner
}
export enum AppNotificationEnum {
  /**
   * 브레이즈 SDK의 푸시 설정 플래그를 업데이트 하는 용도
   */
  SET_BRAZE_PUSH_NOTIFICATION = 'setBrazePushNotification',
  /**
   * 앱에 푸시 갯수를 설정하는 용도
   */
  SET_NOTIFICATION_COUNT = 'setNotificationCount',
}
export enum AppNotificationStateEnum {
  /**
   * 앱에서 푸시를 받을 수 있는 상태인지 확인하는 용도
   */
  GET_NOTIFICATION_STATE = 'getNotificationState',
}
export enum AppSearchEnum {
  APPLY_FILTER = 'applyFilter',
  CHANGE_SEARCH_RESULT_TAB = 'changeSearchResultTab',
  UPDATE_USER_FOLLOWING_STATE = 'updateUserFollowingState',
}
export enum AppCartEnum {
  UPDATE_CART_COUNT = 'handleCartCountUpdated',
}
export enum AppOrderHistoryEnum {
  CONFIRM_ORDER_CANCEL = 'confirmOrderCancel',
  OPEN_ORDER_HISTORY_DETAIL = 'openOrderHistoryDetail',
  UPDATE_ORDER_HISTORY = 'handleOrderHistoryUpdated',
}
export enum AppAnalyticsEnum {
  ANALYTICS = 'analytics',
}

export type AppBridgeName =
  | AppAnalyticsEnum
  | AppCartEnum
  | AppCommonEnum
  | AppOrderHistoryEnum
  | AppSearchEnum;
