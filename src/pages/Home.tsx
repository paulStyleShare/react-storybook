import React from 'react';
import styled, { css } from 'styled-components';
import { variant } from 'styled-system';

import { Box } from '~components/common';

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

const Home: React.FC = () => {
  return <Container>HELLO;</Container>;
};

export default Home;
