import 'styled-components';

import { Styles } from 'styled-components';
/**
 * CSS Prop 사용
 * @example
 * <div
 *  css={css`
 *    background: papayawhip;
 *    color: ${props => props.theme.colors.text};
 *  `}
 * />
 * <Button
 *   css="padding: 0.5em 1em;"
 * />
 *
 * @see {@link https://styled-components.com/docs/api#css-prop}
 * @see {@link https://github.com/DefinitelyTyped/DefinitelyTyped/blob/master/types/styled-components/index.d.ts#L479-L504}
 */
import {} from 'styled-components/cssprop';

declare module 'styled-components' {
  export interface DefaultTheme {
    breakpoints: string[];
    buttonSizes: {
      big: {
        [key: string]: string;
      };
      medium: {
        [key: string]: string;
      };
      small: {
        [key: string]: string;
      };
    };
    colors: {
      white: string;
      black: string;
      gray5: string;
      gray10: string;
      gray20: string;
      gray30: string;
      gray40: string;
      gray50: string;
      gray60: string;
      gray70: string;
      gray80: string;
      gray90: string;
      gray100: string;
      blue: string;
      red: string;
      point: string;
      live: Styles;
      palette: {
        blue: string;
        green: string;
        mint: string;
        orange: string;
        pink: string;
        purple: string;
        sky: string;
        yellow: string;
      };
      alpha: {
        black80: string;
        black16: string;
        black12: string;
        gray5: string;
        white50: string;
        white16: string;
        point50: string;
      };
    };
    fontSizes: string[];
    fontWeights: {
      bold: number;
      normal: number;
    };
    letterSpacings: (number | string)[];
    lineHeights: {
      heading: number;
      paragraph: number;
    };
    mediaQueries: {
      least: string;
      small: string;
      large: string;
    };
    shadows: {
      box: string;
      dropdown: { list: string };
      modal: string;
      toast: string;
      tooltip: string;
    };
    textStyles: {
      h1: {
        [key: string]:
          | number
          | string
          | { fontSize: string; lineHeight: number };
      };
      h2: {
        [key: string]:
          | number
          | string
          | { fontSize: string; lineHeight: number };
      };
      h3: {
        [key: string]:
          | number
          | string
          | { fontSize: string; lineHeight: number };
      };
      h4: {
        [key: string]:
          | number
          | string
          | { fontSize: string; lineHeight: number };
      };
      h5: {
        [key: string]:
          | number
          | string
          | { fontSize: string; lineHeight: number };
      };
      h6: {
        [key: string]:
          | number
          | string
          | { fontSize: string; lineHeight: number };
      };
      p1: {
        [key: string]:
          | number
          | string
          | { fontSize: string; lineHeight: number };
      };
      p2: {
        [key: string]:
          | number
          | string
          | { fontSize: string; lineHeight: number };
      };
      p3: {
        [key: string]:
          | number
          | string
          | { fontSize: string; lineHeight: number };
      };
    };
    radii: {
      box: string;
      text: string;
    };
    zIndices: {
      [key: number]: number;
      dropdown: number;
      gnbOverlay: number;
      gnb: number;
      drawerOverlay: number;
      drawer: number;
      modalOverlay: number;
      modal: number;
    };
  }
}
