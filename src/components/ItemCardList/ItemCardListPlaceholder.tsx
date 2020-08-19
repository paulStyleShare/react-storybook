import React, { FC } from 'react';
import { rem } from 'polished';
import styled from 'styled-components';

import { Box, Column, Row, SkeletonBox } from '~components/common';
import { ItemCardPlaceholder } from '~components/ItemCard';

const ItemCardListPlaceholder: FC = () => {
  return (
    <>
      <Box mb={[rem(6), 0]} mx={[rem(20), 0]}>
        <SkeletonBox
          height={[rem(26), rem(48)]}
          mx={[0, 'auto']}
          width={[rem(180), rem(280)]}
        />
      </Box>
      <StyledRow>
        {Array(4)
          .fill(null)
          .map((_, index) => (
            <Column
              key={index.toString()}
              flex="0 0 auto"
              pb={rem(12)}
              width={[1 / 2, 1 / 4]}
            >
              <ItemCardPlaceholder />
            </Column>
          ))}
      </StyledRow>
    </>
  );
};

const StyledRow = styled(Row)`
  overflow: hidden;

  ${(props) => props.theme.mediaQueries.small} {
    margin-right: 0;
    padding-right: ${rem(20)};
    padding-left: ${rem(20)};
    overflow-x: auto;
    overflow-y: hidden;
    -webkit-overflow-scrolling: touch;
    scroll-snap-type: x mandatory;
    &::-webkit-scrollbar {
      display: none;
    }
  }
`;
StyledRow.defaultProps = {
  my: [rem(12), rem(8)],
};

export default ItemCardListPlaceholder;
