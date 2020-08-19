import React from 'react';
import clsx from 'classnames';
import { rgba } from 'polished';
import styled from 'styled-components';

import { BaseCard } from '~components/BaseCard';
import {
  AbsoluteFill,
  AltLink,
  Box,
  Flex,
  LineClamp,
  Text,
} from '~components/common';
import { GoodsOverviewSchema } from '~schemas/goods';
import { colors } from '~styles/theme/desktop';

export type ItemCardProps = {
  data: GoodsOverviewSchema;
  compact?: boolean;
  contextPage?: string;
  showLikes?: boolean;
  showReviews?: boolean;
  isWebview?: boolean;
  imageSize?: number;
  previousScreen?: string;
  imageVariant?: 'fixed' | 'responsive';
};

const ItemCard: React.FC<ItemCardProps & React.ComponentProps<typeof Box>> = ({
  data,
  imageSize = 312,
  imageVariant = 'responsive',
  compact = false,
  showLikes = true,
  showReviews = true,
  isWebview = false,
  contextPage,
  previousScreen,
  ...props
}) => {
  return (
    <Box
      {...props}
      className={clsx('item-card', props.className)}
      data-context_page={contextPage}
      data-goods_id={data.id}
    >
      <AltLink
        className="item-card__link"
        data-context_page={contextPage}
        data-goods_id={data.id}
        href={
          isWebview
            ? previousScreen
              ? `stsh://goods/${data.id}?previous_screen=${previousScreen}`
              : `stsh://goods/${data.id}`
            : `/goods/${data.id}`
        }
      >
        <BaseCard
          alt={data.name}
          bg="alpha.black12"
          imageHeight={imageSize}
          imageId={data.picture.id}
          imageWidth={imageSize}
          variant={imageVariant}
        >
          {data.status === 'runout' && (
            <AbsoluteFill bg={rgba(colors.gray100, 0.3)}>
              <Flex
                alignItems="center"
                height="100%"
                justifyContent="center"
                width="100%"
              >
                <Text color="white" fontWeight="bold" textStyle="h5">
                  일시품절
                </Text>
              </Flex>
            </AbsoluteFill>
          )}
        </BaseCard>
      </AltLink>
      <Box px={compact ? '4px ' : '6px'} py={compact ? '6px' : '12px'}>
        <AltLink
          display="block"
          href={
            isWebview
              ? `stsh://brand/${data.brand.id}`
              : `/brands/${data.brand.id}`
          }
        >
          <LineClamp
            as="span"
            fontWeight="bold"
            lines={1}
            mb={compact ? '0px' : '3px'}
            textStyle="p2"
            keepHeight
          >
            {data.brand.name}
          </LineClamp>
        </AltLink>
        <AltLink
          className="item-card__link"
          data-context_page={contextPage}
          data-goods_id={data.id}
          display="block"
          href={isWebview ? `stsh://goods/${data.id}` : `/goods/${data.id}`}
        >
          <LineClamp
            as="span"
            lines={compact ? 2 : [2, 1]}
            mb={compact ? '5px' : '8px'}
            textStyle="p2"
            keepHeight
          >
            {data.name}
          </LineClamp>
        </AltLink>
        <Box mb={compact ? '7px' : '8px'}>
          {data.isDiscounted && data.discountRate > 0 && (
            <Text as="span" color="red" fontWeight="bold" textStyle="p1">
              {data.discountRate}%{' '}
            </Text>
          )}
          <Text as="span" color="gray90" fontWeight="bold" textStyle="p1">
            {data.price.toLocaleString()}
          </Text>
          <Text
            as="span"
            color="gray90"
            textStyle="p3"
            {...(isWebview && {
              fontWeight: 'bold',
              textStyle: 'p1',
            })}
          >
            원
          </Text>
        </Box>
        <StyledBox>
          {showLikes && typeof data.likeCount !== 'undefined' && (
            <Text as="span" color="gray60" mr="8px" textStyle="p3">
              좋아요 {data.likeCount.toLocaleString()}
            </Text>
          )}
          {showReviews && typeof data.reviewsCount !== 'undefined' && (
            <Text as="span" color="gray60" textStyle="p3">
              후기 {data.reviewsCount.toLocaleString()}
            </Text>
          )}
        </StyledBox>
      </Box>
    </Box>
  );
};

const StyledBox = styled(Box)`
  white-space: nowrap;
`;

export default ItemCard;
