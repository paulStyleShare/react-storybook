import { em, linearGradient, rem, rgb, rgba } from 'polished';
import { DefaultTheme } from 'styled-components';

const breakpoints = [em(375), em(414)];
const mediaQueries = {
  large: `@media screen and (min-width: ${em(414)})`,
  least: `@media screen and (max-width: ${em(320)})`,
  small: `@media screen and (max-width: ${em(375)})`, // Over mobile size
};

const fontSizes = [
  '11px', // p3
  '12px', // p2
  '13px', // p1
  '14px', // h6
  '14px', // h5
  '16px', // h4
  '18px', // h3
  '20px', // h2
  '24px', // h1
];

const colors = {
  alpha: {
    black12: rgba(0, 0, 0, 0.12),
    black16: rgba(0, 0, 0, 0.16),
    black80: rgba(0, 0, 0, 0.8), // border or background
    gray5: rgba(19, 21, 24, 0.5),
    point50: rgba(77, 0, 235, 0.5),
    white16: rgba(255, 255, 255, 0.16),
    white50: rgba(255, 255, 255, 0.5),
  },
  black: '#000',
  blue: rgb(0, 122, 255),
  // gray
  gray5: rgb(252, 252, 253),
  gray10: rgb(240, 241, 244),
  gray20: rgb(218, 221, 224),
  gray30: rgb(201, 205, 210),
  gray40: rgb(178, 184, 190),
  gray50: rgb(153, 161, 168),
  gray60: rgb(117, 125, 134),
  gray70: rgb(80, 88, 95),
  gray80: rgb(58, 62, 69),
  gray90: rgb(33, 36, 42),
  gray100: rgb(19, 21, 24),
  live: linearGradient({
    colorStops: [rgb(111, 32, 255), rgb(255, 33, 255)],
    toDirection: 'to right',
  }),
  palette: {
    blue: rgb(33, 114, 202),
    green: rgb(67, 174, 89),
    mint: rgb(22, 209, 194),
    orange: rgb(219, 132, 88),
    pink: rgb(233, 89, 124),
    purple: rgb(151, 87, 199),
    sky: rgb(81, 145, 215),
    yellow: rgb(217, 196, 86),
  },
  point: rgb(77, 0, 235),
  red: rgb(248, 21, 66),
  white: '#fff',
};

const fontWeights = {
  bold: 700,
  normal: 400,
};

const lineHeights = {
  heading: 1.25,
  paragraph: 1.18,
};

export const letterSpacings = [0, 0];

const shadows = {
  box: `0 4px 12px 0 ${rgba(colors.gray90, 0.15)}`,
  dropdown: { list: `0 2px 2px 0 ${rgba(colors.gray100, 0.2)}` },
  modal: `0 8px 12px 0 ${rgba(colors.gray90, 0.15)}`,
  toast: `0 2px 10px 0 ${rgba(colors.gray90, 0.2)}`,
  tooltip: `2px 4px 12px 0 ${rgba(colors.gray100, 0.2)}`,
};

const radii = {
  box: '4px',
  text: '2px',
};

export const textStyles = {
  h1: {
    fontSize: rem(24),
    letterSpacing: 0,
    lineHeight: 1.25,
  },
  h2: {
    fontSize: rem(20),
    letterSpacing: 0,
    lineHeight: 1.25,
  },
  h3: {
    fontSize: rem(18),
    letterSpacing: 0,
    lineHeight: 1.22,
  },
  h4: {
    fontSize: rem(16),
    letterSpacing: 0,
    lineHeight: 1.18,
  },
  h5: {
    fontSize: rem(14),
    letterSpacing: 0,
    lineHeight: 1.21,
  },
  h6: {
    fontSize: rem(14),
    letterSpacing: 0,
    lineHeight: 1.21,
  },
  p1: {
    fontSize: rem(13),
    letterSpacing: 0,
    lineHeight: 1.15,
  },
  p2: {
    fontSize: rem(12),
    letterSpacing: 0,
    lineHeight: 1.16,
  },
  p3: {
    fontSize: rem(11),
    letterSpacing: 0,
    lineHeight: 1.18,
  },
};

export const buttonSizes = {
  big: {
    height: rem(50),
  },
  medium: {
    height: rem(34),
  },
  small: {
    height: rem(34),
  },
};

export const zIndices = ([10, 98, 100, 138, 140, 198, 200] as unknown) as {
  [key: number]: number;
  dropdown: number;
  gnbOverlay: number;
  gnb: number;
  drawerOverlay: number;
  drawer: number;
  modalOverlay: number;
  modal: number;
};
zIndices.dropdown = zIndices[0];
zIndices.gnbOverlay = zIndices[1];
zIndices.gnb = zIndices[2];
zIndices.drawerOverlay = zIndices[3];
zIndices.drawer = zIndices[4];
zIndices.modalOverlay = zIndices[5];
zIndices.modal = zIndices[6];

export const lightTheme: DefaultTheme = {
  breakpoints,
  buttonSizes,
  colors,
  fontSizes,
  fontWeights,
  letterSpacings,
  lineHeights,
  mediaQueries,
  radii,
  shadows,
  textStyles,
  zIndices,
};

export const darkTheme: DefaultTheme = {
  ...lightTheme,
  colors: {
    ...lightTheme.colors,
    black: colors.white,
    gray5: colors.gray90,
    gray10: colors.gray80,
    gray20: colors.gray70,
    gray30: colors.gray60,
    gray40: colors.gray50,
    gray50: colors.gray40,
    gray60: colors.gray30,
    gray70: colors.gray20,
    gray80: colors.gray10,
    gray90: colors.gray5,
    gray100: colors.white,
    white: colors.gray100,
  },
};
