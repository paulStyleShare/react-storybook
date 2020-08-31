import React from 'react';
import styled, { css } from 'styled-components';
import { variant } from 'styled-system';

import { Box } from '~components/common';
import ItemTwoByTwoSliderContainer from '~containers/Home/ItemTwoByTwoSliderContainer';
import useApi from '~hooks/useApi';
import { getBrandInfoProxy } from '~services/base/experiment';

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
  const { loading: goodsLoading, data: goodsData, error: goodsError } = useApi(
    getBrandInfoProxy,
    14235,
  );
  if (goodsData == undefined || goodsError || goodsLoading) {
    return null;
  }
  return (
    <Container>
      <ItemTwoByTwoSliderContainer />
    </Container>
  );
};

export default Home;
