import React from 'react';
import { action } from '@storybook/addon-actions';
import { withInfo } from '@storybook/addon-info';
import { ThemeProvider } from 'styled-components';

import { lightTheme as desktopLightTheme } from '~styles/theme/desktop';

import Img from './Img';
export default {
  // 스토리북에서 보여질 그룹과 경로를 명시
  component: Img,
  // 어떤 컴포넌트를 문서화 할지 명시
  decorators: [withInfo],
  title: 'components|basic/Img',
};

export const standard = () => (
  <ThemeProvider theme={desktopLightTheme}>
    <Img
      responsive={false}
      rootDir=""
      src="https://usercontents-c.styleshare.io/images/47542675/original"
    />
  </ThemeProvider>
);
export const big = () => (
  <ThemeProvider theme={desktopLightTheme}>
    <Img
      responsive={false}
      rootDir=""
      src="https://usercontents-c.styleshare.io/images/47542675/original"
    />
  </ThemeProvider>
);
