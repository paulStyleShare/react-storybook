import React from 'react';
import isEqual from 'react-fast-compare';
import { useSelector } from 'react-redux';
import styled, { css } from 'styled-components';
import { variant } from 'styled-system';

import { Box } from '~components/common';
import ItemTwoByTwoSliderContainer from '~containers/Home/ItemTwoByTwoSliderContainer';
import useApi from '~hooks/useApi';
import { RootState } from '~reduxes/index';
import { MeState } from '~reduxes/me/reducers';
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
  const { meData, meStatus } = useSelector<
    RootState,
    Pick<MeState, 'meData' | 'meStatus'>
  >(
    (state) => ({ meData: state.me.meData, meStatus: state.me.meStatus }),
    isEqual,
  );
  const { loading: goodsLoading, data: goodsData, error: goodsError } = useApi(
    getBrandInfoProxy,
    14235,
  );
  if (goodsData == undefined || goodsError || goodsLoading) {
    return null;
  }
  return (
    <Container>
      <div>nickname: {meData && meData.nickname}</div>
      <ItemTwoByTwoSliderContainer />
    </Container>
  );
};

export default Home;
