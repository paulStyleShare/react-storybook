import { em, rem } from 'polished';
import styled from 'styled-components';

import Box from './Box';
import Flex from './Flex';

export const Container = styled(Box)`
  max-width: ${rem(1280)};
  overflow: hidden;

  ${({ theme }) => theme.mediaQueries.small} {
    padding-right: ${rem(20)};
    padding-left: ${rem(20)};
  }

  @media (min-width: ${em(1280)}) {
    margin-right: auto;
    margin-left: auto;
  }

  @media (min-width: ${em(1024)}) and (max-width: ${em(1279)}) {
    margin-right: ${rem(80)};
    margin-left: ${rem(80)};
  }
`;

Container.displayName = 'Grid.Container';

export const Row = styled(Flex)`
  /* stylelint-disable no-empty-source */
  /* stylelint-enable */
`;

Row.displayName = 'Grid.Row';
Row.defaultProps = {
  mx: [rem(-5), rem(-4)],
};

export const Column = styled(Box)`
  /* stylelint-disable no-empty-source */
  /* stylelint-enable */
`;

Column.displayName = 'Grid.Column';
Column.defaultProps = {
  flex: '1 1 auto',
  px: [rem(5), rem(4)],
};
