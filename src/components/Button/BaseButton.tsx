import React from 'react';
import { rem, shade } from 'polished';
import styled, { css } from 'styled-components';
import {
  compose,
  display,
  DisplayProps,
  fontWeight,
  FontWeightProps,
  position,
  PositionProps,
  ResponsiveValue,
  space,
  SpaceProps,
  textStyle,
  TextStyleProps,
  variant,
  width,
  WidthProps,
} from 'styled-system';

import { colors, mediaQueries } from '~styles/theme/desktop';

export type BaseButtonProps = {
  icon?: React.ReactNode;
};

const variants = {
  'ghost-green': {
    '&:active': {
      backgroundColor: '#00ae94',
      borderColor: '#00d0b1',
      color: 'white',
    },
    '&:disabled': {
      backgroundColor: 'white',
      borderColor: 'gray40',
      color: 'gray40',
    },
    '&:visited': {
      color: '#00c1a3',
    },
    'backgroundColor': 'white',

    'border': `1px solid #00d0b1`,
    'color': '#00c1a3',
    'padding': `0 ${rem(20)}`,
    [mediaQueries.large]: {
      '&:hover:not(:disabled):not(:active)': {
        backgroundColor: '#00d0b1',
        borderColor: '#00d0b1',
        color: 'white',
      },
    },
  },
  'line-gray': {
    '&:active': {
      backgroundColor: 'alpha.black12',
      color: shade(0.12, colors.gray60),
    },
    '&:disabled': {
      backgroundColor: 'gray20',
      color: 'gray20',
    },
    '&:hover:not(:disabled):not(:active)': {
      [mediaQueries.large]: {
        backgroundColor: 'alpha.black12',
        color: shade(0.12, colors.gray60),
      },
    },
    'borderColor': 'gray20',
    'borderRadius': '4px',
    'borderStyle': 'solid',

    'borderWidth': '1px',
    'color': 'gray60',
    'padding': `0 ${rem(20)}`,
  },
  'solid-gray': {
    '&:active': {
      backgroundColor: 'gray40',
    },
    '&:disabled': {
      backgroundColor: 'alpha.black12',
      color: 'gray10',
    },
    '&:visited': {
      color: 'gray90',
    },
    'backgroundColor': 'gray20',
    'borderColor': 'gray20',
    'borderStyle': 'solid',

    'borderWidth': '1px',
    'color': 'gray90',
    'padding': `0 ${rem(20)}`,
    [mediaQueries.large]: {
      '&:hover:not(:disabled):not(:active)': {
        backgroundColor: 'gray10',
      },
    },
  },
  'solid-green': {
    '&:active': {
      backgroundColor: '#00c1a3',
    },
    '&:disabled': {
      backgroundColor: 'gray40',
    },
    '&:hover:not(:disabled):not(:active)': {
      [mediaQueries.large]: {
        backgroundColor: '#3cdfbf',
      },
    },
    '&:visited': {
      color: 'white',
    },
    'backgroundColor': '#00d0b1',
    'color': 'white',
    'padding': `0 ${rem(20)}`,
  },
  'solid-point': {
    '&:active': {
      backgroundColor: shade(0.12, colors.point),
      color: shade(0.12, colors.white),
    },
    '&:disabled': {
      backgroundColor: 'gray20',
      color: 'white',
    },
    '&:hover:not(:disabled):not(:active)': {
      [mediaQueries.large]: {
        backgroundColor: shade(0.12, colors.point),
        color: shade(0.12, colors.white),
      },
    },
    'backgroundColor': 'point',

    'borderRadius': '4px',
    'color': 'white',
    'padding': `0 ${rem(20)}`,
  },
  'text-green': {
    '&:active': {
      color: '#00ae94',
    },
    '&:disabled': {
      color: 'gray40',
    },
    '&:visited': {
      color: '#00c1a3',
    },
    'backgroundColor': 'transparent',
    'borderRadius': 0,
    'color': '#00c1a3',

    'fontWeight': 'bold',
    'height': 'auto',
    'padding': 0,
    [mediaQueries.large]: {
      '&:hover:not(:disabled):not(:active)': {
        color: '#3cdfbf',
      },
    },
  },
};

export const BaseButton = styled('button')<
  {
    useTransition?: boolean;
    variant?: ResponsiveValue<keyof typeof variants>;
  } & SpaceProps &
    DisplayProps &
    PositionProps &
    WidthProps &
    FontWeightProps &
    TextStyleProps
>(
  {
    alignItems: 'center',
    appearance: 'none',
    border: 0,
    borderRadius: '9999px',
    boxSizing: 'border-box',
    cursor: 'pointer',
    justifyContent: 'center',
    outline: 'none',
    position: 'relative',
    textDecoration: 'none',
    userSelect: 'none',
  },
  css<{ useTransition?: boolean }>`
    ${(props) =>
      !!props.useTransition &&
      `
    transitionDuration: 0.25s,
    transitionProperty: color, background-color,
    transitionTimingFunction: ease-out,
    `}

    &:disabled {
      cursor: not-allowed;
    }
  `,
  variant({ prop: 'size', scale: 'buttonSizes' }),
  variant({ variants }),
  compose(fontWeight, textStyle, space, display, position, width),
);

BaseButton.defaultProps = {
  display: 'flex',
  fontWeight: 'bold',
  textStyle: 'h6',
  useTransition: true,
};
