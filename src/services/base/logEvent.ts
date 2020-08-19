import { EventParamSchema, EventTypeEnum } from '~schemas/experiment';

export const logEvent = (type: EventTypeEnum, properties: EventParamSchema) => {
  const concatProperties =
    typeof properties === 'object' && properties !== null
      ? '&' +
        Object.entries(properties)
          .map(
            (entry) =>
              `${encodeURIComponent(entry[0])}=${encodeURIComponent(entry[1])}`,
          )
          .join('&')
      : '';
  const deeplink = `stsh://analytics?event=${encodeURIComponent(
    type,
  )}${concatProperties}`;

  if (navigator.userAgent.toLowerCase().indexOf('styleshare') !== -1) {
    setTimeout(() => {
      window.location.href = deeplink;
    });
  } else {
    // amplitude.getInstance().logEvent(type, properties);
  }
};
