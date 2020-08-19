import React, { Component } from 'react';
// import { Route } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import styled, { css } from 'styled-components';
import { variant } from 'styled-system';

import { Box } from '~components/common';
import Home from '~pages/Home';
import { lightTheme as desktopLightTheme } from '~styles/theme/desktop';

const Container = styled(Box)(
  {
    borderRadius: '16px',
    maxHeight: 'calc(100vh - 360px)',
    minWidth: '420px',
    overflowX: 'hidden',
    overflowY: 'auto',
  },
  css`
    background: ${(props) => props.theme.colors.white};
    border: 1px solid ${(props) => props.theme.colors.gray20};
    box-shadow: ${(props) => props.theme.shadows.modal};
  `,
  variant({
    prop: 'size',
    variants: {
      big: {
        width: '1065px',
      },
      medium: {
        width: '635px',
      },
      small: {
        width: '420px',
      },
    },
  }),
);

class App extends Component {
  render() {
    return (
      <ThemeProvider theme={desktopLightTheme}>
        {/* <ModalProvider> */}
        <Container
          style={{
            height: '100vh',
            margin: '0 auto 0 auto',
            maxHeight: '900px',
            maxWidth: '414px',
          }}
        >
          HOME
          <Home />
          {/* <Route component={Home} path="/" exact /> */}
        </Container>
        {/* </ModalProvider> */}
      </ThemeProvider>
    );
  }
}

export default App;
