import { hsla, parseToHsl } from 'polished';
import { HslaColor } from 'polished/lib/types/color';

import { b64EncodeUnicode } from './base64';
import { isDevelopment } from './environment';
import subDomainByPath from './sub-domain-by-path';

const USER_CONTENTS_URLS = [
  // 'https://usercontents-a.styleshare.io',
  // 'https://usercontents-b.styleshare.io',
  'https://usercontents-c.styleshare.io',
];
export const staticURL = (
  id: number | string,
  width: number,
  height: number,
): string =>
  // USER_CONTENTS_URLS[Math.floor(Math.random() * 3)]
  `${USER_CONTENTS_URLS[0]}/images/${id}/${width}x${height}`;
export const staticOriginalUrl = (id: number | string): string =>
  `${USER_CONTENTS_URLS[0]}/images/${id}/original`;

export const linkURL = (path: string): string =>
  `${
    typeof window !== 'undefined'
      ? window.location.origin
      : (process.env.API_BASE_URL as string)
  }${path}`;

export function getSubDomain(pathname: string): string | undefined {
  let res;

  if (!!subDomainByPath && subDomainByPath.constructor === Object) {
    Object.keys(subDomainByPath).forEach((key) => {
      if (
        subDomainByPath[key as keyof typeof subDomainByPath].some(
          (regex) => !!regex.exec(pathname),
        )
      ) {
        res = key;
      }
    });
  }

  return res;
}

export function getScrollBarWidth(): number {
  // Reference: https://stackoverflow.com/questions/13382516/getting-scroll-bar-width-using-javascript
  const outer = document.createElement('div');
  outer.style.visibility = 'hidden';
  outer.style.overflow = 'scroll';
  // @ts-ignore: style에 ms-overflow-style이 없다는 ts 에러
  outer.style.msOverflowStyle = 'scrollbar';
  document.body.appendChild(outer);

  const inner = document.createElement('div');
  outer.appendChild(inner);

  const scrollBarWidth = outer.offsetWidth - inner.offsetWidth;

  // Remove
  const { parentNode } = outer;
  if (parentNode) {
    parentNode.removeChild(outer);
  }

  return scrollBarWidth;
}

export const encodePageUrl = (path: string): string =>
  b64EncodeUnicode(`${window.location.origin}${path}`);

type Px2vw = (px: number, base?: number) => string;
export const px2vw: Px2vw = (px, base = 375) =>
  `${Math.ceil((px / base) * 10000) / 100}vw`;

type Px2rem = (px: number, base?: number) => string;
export const px2rem: Px2rem = (px, base = 16) =>
  `${Math.ceil((px / base) * 100) / 100}rem`;

const scrimCoordinates = [
  [0, 1],
  [19, 0.738],
  [34, 0.541],
  [47, 0.382],
  [56.5, 0.278],
  [65, 0.194],
  [73, 0.126],
  [80.2, 0.075],
  [86.1, 0.042],
  [91, 0.021],
  [95.2, 0.008],
  [98.2, 0.002],
  [100, 0],
];
/**
 * https://css-tricks.com/easing-linear-gradients/
 */
type ScrimGradient = (r: number, g: number, b: number, a?: number) => string;
export const scrimGradient: ScrimGradient = (r, g, b, a = 1) => {
  const linearGradient = scrimCoordinates
    .map(
      ([colorStop, alphaValue]) =>
        `${hsla(
          parseToHsl(`rgba(${r}, ${g}, ${b}, ${a * alphaValue})`) as HslaColor,
        )} ${colorStop}%`,
    )
    .join(',');
  return `linear-gradient(${linearGradient})`;
};

/**
 * ref를 여러개 적용하고 싶을 때...
 *
 * @param refs
 */
export function combineRefs(...refs: unknown[]) {
  return (node: HTMLElement): void => {
    refs.forEach((ref) => {
      if (ref) {
        if (typeof ref === 'function') {
          ref(node);
        } else {
          (ref as Record<string, unknown>).current = ref;
        }
      }
    });
  };
}

export const retry = async <T = any>(
  fn: () => Promise<any>,
  retriesLeft = 3,
  interval = 1000,
): Promise<T> => {
  return new Promise((resolve, reject) => {
    fn()
      .then(resolve)
      .catch((error) => {
        if (isDevelopment) {
          reject(error);
          return;
        }

        setTimeout(() => {
          if (retriesLeft === 1) {
            reject(error);
            return;
          }

          retry(fn, retriesLeft - 1, interval).then(resolve, reject);
        }, interval);
      });
  });
};

const QUANTITY_SYMBOLS: [number, string][] = [
  [Math.pow(10, 0), ''],
  [Math.pow(10, 3), 'K'],
  [Math.pow(10, 6), 'M'],
  [Math.pow(10, 9), 'G'],
  [Math.pow(10, 12), 'T'],
  [Math.pow(10, 15), 'P'],
];
export function numberScale(value: number): string {
  const isNagative = value < 0;
  const v = Math.abs(value);

  let factor = 1;
  let suffix = '';

  for (let index = 0; index < QUANTITY_SYMBOLS.length; index++) {
    const [f, s] = QUANTITY_SYMBOLS[index];

    if (f > v) break;

    factor = f;
    suffix = s;
  }

  let num = v / factor;

  if (num === Math.ceil(num)) {
    num = Math.round(num);
  } else {
    num = parseFloat(num.toFixed(1));
  }

  return `${isNagative ? '-' : ''}${num}${suffix}`;
}

export const imgSrcSet = (path: string, rootDir = './assets/'): string => {
  const [fileName, fileExtension] = path.split('.');
  return `${rootDir + fileName}.${fileExtension} 1x, ${
    rootDir + fileName
  }@2x.${fileExtension} 2x, ${rootDir + fileName}@3x.${fileExtension} 3x`;
};

interface properties {
  owner?: string;
  variant?: string;
  param?: string | number;
}

export const logEvent = (name: string, properties?: properties) => {
  properties = properties || {};
  if (!Object.prototype.hasOwnProperty.call(properties, 'owner')) {
    properties['owner'] = process.env.OWNER;
  }
  if (!Object.prototype.hasOwnProperty.call(properties, 'variant')) {
    properties['variant'] = process.env.VARIANT;
  }
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
    name,
  )}${concatProperties}`;
  if (navigator.userAgent.toLowerCase().indexOf('styleshare') !== -1) {
    setTimeout(() => {
      window.location.href = deeplink;
    });
  }
  // } else {
  //   amplitude.getInstance().logEvent(name, properties);
  // }
};
