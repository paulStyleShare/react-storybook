import {
  AppAnalyticsEnum,
  AppBridgeName,
  AppCartEnum,
  AppOrderHistoryEnum,
  AppSearchEnum,
} from '~schemas/webkit';

import { encodePageUrl } from './funcs';
import { captureException } from './sentry';
import UserAgent from './useragent';

export const debug = (message: string): void => {
  // eslint-disable-next-line no-console
  console.log(`[DEBUG] ${message}`);
};

export const executeAppJS = (
  funcName: AppBridgeName,
  payload: { event?: string; parameters?: Record<string, unknown> } & Record<
    string,
    unknown
  > = {},
): boolean => {
  const useragent = new UserAgent();
  const { platforms } = useragent;

  if (process.env.NODE_ENV !== 'production') {
    debug(
      `exectued app js function: ${funcName} with ${JSON.stringify(payload)}`,
    );
    return true;
  }

  if (!useragent.isFromApp) return false;

  // 함수 실행 중 에러가 나는 경우가 있어 try catch로 감쌈
  try {
    if (
      platforms.iOS &&
      window.webkit &&
      window.webkit.messageHandlers &&
      window.webkit.messageHandlers[funcName]
    ) {
      // @ts-ignore: payload의 타입이 워낙 제각각이라..
      window.webkit.messageHandlers[funcName].postMessage(payload);
      return true;
    }

    if (platforms.android) {
      if (
        window.ProgressBarInterface &&
        window.ProgressBarInterface[funcName]
      ) {
        window.ProgressBarInterface[funcName]();
        return true;
      }

      if (
        window.SearchResultInterface &&
        window.SearchResultInterface[funcName as AppSearchEnum]
      ) {
        const json = JSON.stringify(payload);
        window.SearchResultInterface[funcName as AppSearchEnum](json);
        return true;
      }

      if (
        window.OrderHistoryInterface &&
        window.OrderHistoryInterface[funcName as AppOrderHistoryEnum]
      ) {
        const json = JSON.stringify(payload);
        window.OrderHistoryInterface[funcName as AppOrderHistoryEnum](json);
        return true;
      }

      if (
        window.CartInterface &&
        window.CartInterface[funcName as AppCartEnum]
      ) {
        window.CartInterface[funcName as AppCartEnum]();
        return true;
      }

      if (
        window.EventTrackerInterface &&
        window.EventTrackerInterface[funcName as AppAnalyticsEnum]
      ) {
        const json = JSON.stringify(payload);
        window.EventTrackerInterface[funcName as AppAnalyticsEnum](json);
        return true;
      }
    }
  } catch (error) {
    captureException(error);
    return false;
  }
  return false;
};

export const openProductFilterWebview = ({
  path,
  title,
  query,
}: {
  path: string;
  title: string;
  query?: Record<string, unknown>;
}): void => {
  const qs = new URLSearchParams({
    ...(typeof query === 'undefined' ? {} : (query as Record<string, string>)),
  }).toString();
  window.location.href = `stsh-web://open-product-filter/${encodePageUrl(
    `${path}?${qs}`,
  )}?title=${encodeURIComponent(title)}`;
};
