import React from 'react';
import { linearGradient, rgba } from 'polished';
import styled from 'styled-components';

import { Avatar } from '~components/Avatar';
import { BaseCard } from '~components/BaseCard';
import { AltLink, Box, Flex, Text } from '~components/common';
import { StyleSummary } from '~components/StyleSummary';
import { StyleOverviewSchema } from '~schemas/style';

export type StyleCardProps = {
  data: StyleOverviewSchema;
  compact?: boolean;
  hideCounts?: boolean;
  contextPage?: string;
};

const StyleCard: React.FC<
  StyleCardProps & React.ComponentProps<typeof Box>
> = ({ data, compact = false, hideCounts = false, contextPage, ...props }) => {
  return (
    <Box
      {...props}
      className="style-card"
      data-context_page={contextPage}
      data-style_id={data.id}
    >
      <Box position="relative">
        {data.pictures && data.pictures.length > 0 && (
          <AltLink
            className="style-card__link"
            data-style_id={data.id}
            href={`/${data.author.username}/${data.id}`}
          >
            <BaseCard
              alt={data.description}
              imageHeight={312}
              imageId={data.pictures[0].id}
              imageWidth={312}
              plural={data.pictures.length > 1}
            >
              <Gradient
                bottom="0"
                display={['block', 'none']}
                left="0"
                position="absolute"
                pt="20%"
                right="0"
              />
              <UnclickableFlex
                alignItems="center"
                bottom="8px"
                display={['flex', 'none']}
                left="8px"
                position="absolute"
                right="8px"
              >
                <Avatar
                  css={`
                    width: 20px;
                    height: 20px;
                  `}
                  data={{
                    id: data.author.id,
                    nickname: data.author.nickname,
                    profilePictureId: data.author.profilePicture?.id,
                    username: data.author.username,
                  }}
                  size={20}
                  lazy
                />
                &nbsp;
                <Text as="span" color="white" fontWeight="bold" textStyle="p3">
                  {data.author.nickname}
                </Text>
              </UnclickableFlex>
            </BaseCard>
          </AltLink>
        )}
      </Box>
      <StyleSummary
        compact={compact}
        data={data}
        hideCounts={hideCounts}
        ml={['1px', '0px']}
        mr={['4px', compact ? '12px' : '32px']}
        mt={compact ? '8px' : ['8px', '12px']}
      />
    </Box>
  );
};

const UnclickableBox = styled(Box)`
  pointer-events: none;
`;

const UnclickableFlex = styled(Flex)`
  pointer-events: none;
`;

const Gradient = styled(UnclickableBox)`
  ${(props) =>
    linearGradient({
      colorStops: [
        rgba(props.theme.colors.gray100, 0),
        rgba(props.theme.colors.gray100, 0.4),
      ],
      fallback: 'transparent',
      toDirection: 'to bottom',
    })}
`;

export default StyleCard;
