export const isDevelopment =
  process.env.APP_ENV === 'development' ||
  process.env.NODE_ENV !== 'production';
export const isStage =
  process.env.APP_ENV === 'stage' && process.env.NODE_ENV === 'production';
export const isCanary =
  process.env.APP_ENV === 'canary' && process.env.NODE_ENV === 'production';
export const isProduction =
  process.env.APP_ENV === 'production' && process.env.NODE_ENV === 'production';
