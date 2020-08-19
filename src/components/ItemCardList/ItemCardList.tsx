import React, { FC } from 'react';
import { rem } from 'polished';
import styled from 'styled-components';

import { Box, Column, Row, Text } from '~components/common';
import { ItemCard, ItemCardPlaceholder } from '~components/ItemCard';
import { GoodsOverviewSchema } from '~schemas/goods';

export type ItemCardData = {
  // 여기에 가능한 컴포넌트 목록 추가?
  component: string;
  // 여기에 가능한 데이터 스키마 추가?
  data: GoodsOverviewSchema;
  contextPage?: string;
};

type ItemCardListProps = {
  title?: string;
  items: ItemCardData[];
};

const ItemCardList: FC<ItemCardListProps> = ({ title, items }) => {
  return (
    <>
      {typeof title !== 'undefined' && (
        <Box mb={[rem(6), 0]} mx={[rem(20), 0]} textAlign={['left', 'center']}>
          <Text color="gray90" fontWeight="bold" textStyle={['h4', 'h2']}>
            {title}
          </Text>
        </Box>
      )}
      <StyledRow>
        {items.length === 0
          ? /* TODO: 들어오는 component에 따라 placeholder도 달라지게 작업 */
            Array(4)
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
              ))
          : items.map(({ component, ...others }) => {
              switch (component) {
                case 'ItemCard':
                  return (
                    <Column
                      key={others.data.id}
                      flex="0 0 auto"
                      width={[1 / 2, 1 / 4]}
                    >
                      <ItemCard {...others} />
                    </Column>
                  );
                default:
                  // Unsupported component
                  return null;
              }
            })}
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

export default ItemCardList;
