import { ErrorInfo } from 'react';
import * as Sentry from '@sentry/browser';
import * as Integrations from '@sentry/integrations';

import { isCanary, isDevelopment, isProduction, isStage } from './environment';

export const options: Sentry.BrowserOptions = {
  attachStacktrace: true,
  beforeSend: (event) => {
    if (event.message && event.message.startsWith('ReportingObserver')) {
      // And check if the observer's report had a body, if so, check whether sourceFile points to chrome-extension. If so, drop the event.
      if (
        event.extra &&
        event.extra.body &&
        (event.extra.body as { sourceFile?: string }).sourceFile &&
        ((event.extra.body as { sourceFile?: string })
          .sourceFile as string).startsWith('chrome-extension')
      ) {
        return null;
      }
    }
    if (event.message && event.message.startsWith('ChunkLoadError')) {
      event.fingerprint = ['{{ type }}', 'Loading chunk failed'];
    }
    // Otherwise, just let it through
    return event;
  },
  blacklistUrls: [
    // Facebook flakiness
    /graph\.facebook\.com/i,
    // Facebook blocked
    /connect\.facebook\.net\/en_US\/all\.js/i,
    // Woopra flakiness
    /eatdifferent\.com\.woopra-ns\.com/i,
    /static\.woopra\.com\/js\/woopra\.js/i,
    // Chrome extensions
    /extensions\//i,
    /^chrome:\/\//i,
    // Other plugins
    /127\.0\.0\.1:4001\/isrunning/i, // Cacaoweb
    /webappstoolbarba\.texthelp\.com\//i,
    /metrics\.itunes\.apple\.com\.edgesuite\.net\//i,
  ],
  dsn: process.env.SENTRY_DSN,
  environment: isProduction
    ? 'production'
    : isCanary
    ? 'canary'
    : isStage
    ? 'stage'
    : 'development',
  ignoreErrors: [
    // Random plugins/extensions
    'top.GLOBALS',
    // See: http://blog.errorception.com/2012/03/tale-of-unfindable-js-error.html
    'originalCreateNotification',
    'canvas.contentDocument',
    'MyApp_RemoveAllHighlights',
    'http://tt.epicplay.com',
    "Can't find variable: ZiteReader",
    "Can't find variable: __naverapp__",
    "Can't find variable: NaverDetectLang",
    'jigsaw is not defined',
    'ComboSearch is not defined',
    'http://loading.retry.widdit.com/',
    'atomicFindClose',
    // Facebook borked
    'fb_xd_fragment',
    // ISP "optimizing" proxy - `Cache-Control: no-transform` seems to
    // reduce this. (thanks @acdha)
    // See http://stackoverflow.com/questions/4113268
    'bmi_SafeAddOnload',
    'EBCallBackMessageReceived',
    // See http://toolbar.conduit.com/Developer/HtmlAndGadget/Methods/JSInjection.aspx
    'conduitPage',
  ],
  integrations: isDevelopment
    ? // Instead, dump the errors to the console
      // Trigger DevTools debugger instead of using console.log
      [new Integrations.Debug({ debugger: false })]
    : [
        new Integrations.ExtraErrorData(),
        // new Integrations.CaptureConsole(),
        new Integrations.Dedupe(),
      ],
  maxBreadcrumbs: 50,
  whitelistUrls: [/\.styleshare\.kr/, /\.styleshare\.io/],
};

interface ExceptionContext {
  err: ErrorInfo;
  query?: string;
  pathname?: string;
}

export function captureException(error: unknown, ctx?: ExceptionContext): void {
  Sentry.withScope((scope) => {
    if (error) {
      scope.setExtra('error', error);
    }
    if (error && (error as { statusCode?: number }).statusCode) {
      scope.setExtra(
        'statusCode',
        (error as { statusCode?: number }).statusCode,
      );
    }

    if (typeof ctx !== 'undefined') {
      const { err, query, pathname } = ctx;

      if (typeof window !== 'undefined') {
        scope.setExtra('query', query);
        scope.setExtra('pathname', pathname);
      }

      if (err) {
        Object.keys(err).forEach((key) => {
          const val = ((err as unknown) as Record<string, unknown>)[key];

          if (val) {
            scope.setExtra(key, val);
          }
        });
      }
    }
    Sentry.captureException(error);
  });
}
