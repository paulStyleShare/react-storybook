import { rem } from 'polished';

import {
  darkTheme as webDarkTheme,
  lightTheme as webLightTheme,
} from './desktop';

export const textStyles = {
  display1: {
    fontSize: rem(32),
    letterSpacing: rem(-0.3),
    lineHeight: 1.34,
  },
  h1: {
    fontSize: rem(24),
    letterSpacing: rem(-0.4),
    lineHeight: 1.33,
  },
  h2: {
    fontSize: rem(22),
    letterSpacing: rem(-0.4),
    lineHeight: 1.22,
  },
  h3: {
    fontSize: rem(20),
    letterSpacing: rem(-0.4),
    lineHeight: 1.35,
  },
  h4: {
    fontSize: rem(18),
    letterSpacing: rem(-0.4),
    lineHeight: 1.44,
  },
  h5: {
    fontSize: rem(16),
    letterSpacing: rem(-0.4),
    lineHeight: 1.31,
  },
  h6: {
    fontSize: rem(16),
    letterSpacing: rem(-0.4),
    lineHeight: 1.31,
  },
  p1: {
    fontSize: rem(15),
    letterSpacing: rem(-0.4),
    lineHeight: 1.4,
  },
  p2: {
    fontSize: rem(14),
    letterSpacing: rem(-0.4),
    lineHeight: 1.43,
  },
  p3: {
    fontSize: rem(13),
    letterSpacing: rem(-0.3),
    lineHeight: 1.38,
  },
};

export const lightTheme = {
  ...webLightTheme,
  textStyles,
};
export const darkTheme = {
  ...webDarkTheme,
  textStyles,
};
