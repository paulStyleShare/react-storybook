interface Webkit {
  messageHandlers: {
    // common
    setAnalyticsInformation: {
      postMessage(payload: Record<string, unknown>): void;
    };
    startLoading: {
      postMessage(): void;
    };
    stopLoading: {
      postMessage(): void;
    };
    // notification
    getNotificationState: {
      postMessage(): boolean;
    };
    setBrazePushNotification: {
      postMessage(isEnabled: boolean): void;
    };
    setNotificationCount: {
      postMessage(count: number): void;
    };
    // search
    applyFilter: {
      postMessage(payload: {
        brandIds?: string; // 1,2,3
        categoryIds?: string; // 1,2,3
        maxPrice?: '' | number;
        minPrice?: '' | number;
      }): void;
    };
    changeSearchResultTab: {
      postMessage(payload: { tab: string }): void;
    };
    updateUserFollowingState: {
      postMessage(payload: { isFollowing: boolean; userID: number }): void;
    };
    // cart
    handleCartCountUpdated: {
      postMessage(): void;
    };
    // order
    confirmOrderCancel: {
      postMessage(payload: {
        title: string;
        message: string;
        cancel: {
          title: string;
        };
        confirm: {
          title: string;
          handler: string;
        };
      }): void;
    };
    openOrderHistoryDetail: {
      postMessage(payload: { orderId: string }): void;
    };
    handleOrderHistoryUpdated: {
      postMessage(): void;
    };
    // analytics
    analytics: {
      postMessage(payload: {
        event: string;
        parameters: Record<string, unknown>;
      }): void;
    };
  };
}

interface AppNotificationInterface {
  setBrazePushNotification(isEnabled: boolean): void;
  setNotificationCount(json: string): void;
}
interface AppNotificationStateInterface {
  getNotificationState(): boolean;
}
interface AppSearchResultInterface {
  applyFilter(json: string): void;
  changeSearchResultTab(json: string): void;
  updateUserFollowingState(json: string): void;
}
interface AppCartInterface {
  handleCartCountUpdated(): void;
}
interface AppOrderHistoryInterface {
  confirmOrderCancel(json: string): void;
  openOrderHistoryDetail(json: string): void;
  handleOrderHistoryUpdated(): void;
}
interface AppAnalyticsInterface {
  analytics(json: string): void;
}

interface AppBridgeMessageEvent<T> extends MessageEvent {
  readonly data: {
    event: string;
    payload?: T;
  };
}

interface Window {
  amplitude?: any;
  crypto?: any;
  msCrypto?: any;
  webkit?: Webkit;
  NotificationInterface?: AppNotificationInterface;
  NotificationStateInterface?: AppNotificationStateInterface;
  SearchResultInterface?: AppSearchResultInterface;
  CartInterface?: AppCartInterface;
  OrderHistoryInterface?: AppOrderHistoryInterface;
  EventTrackerInterface?: AppAnalyticsInterface;
  ProgressBarInterface?: { [funcName: string]: () => void }; // FIXME: 이거 사용되나요?
  gaData?: {
    [id: string]: {
      experiments: {
        [key: string]: '1' | '0';
      };
      hitcount: number;
    };
  };
  prerenderReady: boolean;
}

interface Document {
  lazyLoadInstance?: any;
  selection?: Selection;
}

interface MessageEvent {
  readonly data: {
    event: string;
    payload: Record<string, string | number>;
  };
}

/**
 * Google Tag Manager dataLayer
 */
declare const dataLayer: any[];

declare module '*.md' {
  const content: string;
  export default content;
}

declare module '*.jpg' {
  const src: string;
  export default src;
}

declare module '*.png' {
  const src: string;
  export default src;
}

declare module '*.webp' {
  const src: string;
  export default src;
}

declare module '*.svg' {
  const content: any;
  export default content;
}
