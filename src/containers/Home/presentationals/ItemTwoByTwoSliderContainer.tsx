import React, { useMemo } from 'react';
import styled, { css } from 'styled-components';

import { Carousel } from '~components/Carousel';
import { Box } from '~components/common';
import { ItemCard } from '~components/ItemCard';
import { GoodsOverviewSchema } from '~schemas/goods';

const Container = styled.div`
  width: 100%;
  padding-bottom: 14px;
  padding-left: 14px;
`;

const TitleContainer = styled.div`
  padding: 20px 0px 20px 0px;
`;

const Title = styled.div`
  color: rgb(0, 0, 0);
  font-weight: bold;
  font-size: 17px;
`;
const Settings = {
  centerMode: true,
  centerPadding: '16px',
  className: 'center',
  dots: true,
  infinite: true,
  slidesToScroll: 1,
  slidesToShow: 1,
};

type Props = {
  title: string;
  datas: GoodsOverviewSchema[];
  size: number;
};

type ItemProps = {
  datas: GoodsOverviewSchema[];
};
const ItemTwoByTwoSliderContainer: React.FC<Props> = ({
  title,
  datas,
  size,
}) => {
  const chunks = useMemo(() => {
    if (datas) {
      const groups = datas
        .map((e, i) => {
          return i % size === 0 ? datas.slice(i, i + size) : null;
        })
        .filter((e) => {
          return e;
        });
      return groups;
    }
  }, [datas, size]);
  if (
    (datas && datas.length === 0) ||
    datas == undefined ||
    chunks == undefined
  ) {
    return null;
  }

  return (
    <Container>
      <TitleContainer>
        <Title>{title}</Title>
      </TitleContainer>
      <div
        css={css`
          padding-bottom: 25px;
          overflow-x: hidden;
          background-color: ${({ theme }) => theme.colors.white};
        `}
      >
        <div
          css={`
            display: flex;
            flex-wrap: wrap;
            margin-left: -16px;
            width: 100%;
            /* margin-right: -4px; */
          `}
        >
          <Box width="100%">
            <Carousel settings={Settings}>
              {chunks.map(
                (chunk, index) =>
                  chunk && (
                    <HorizontalItemContainer key={index} datas={chunk} />
                  ),
              )}
            </Carousel>
          </Box>
        </div>
      </div>
    </Container>
  );
};

const HorizontalItemContainer: React.FC<ItemProps> = ({ datas }) => {
  return (
    <div
      css={`
        display: flex;
        flex-wrap: wrap;
        /* margin-right: 8px; */
      `}
    >
      {datas.map((_data) => (
        <ItemCard
          key={_data.id}
          css={`
            flex-basis: 50%;
            width: 50%;
            padding-right: 8px;
            margin-bottom: 16px;
          `}
          data={_data}
          isWebview={true}
        />
      ))}
    </div>
  );
};

export default ItemTwoByTwoSliderContainer;
