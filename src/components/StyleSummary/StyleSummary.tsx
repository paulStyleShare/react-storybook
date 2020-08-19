import React from 'react';

import { Avatar } from '~components/Avatar';
import { AltLink, Box, Flex, Text } from '~components/common';
import LineClamp from '~components/common/LineClamp';
import { StyleOverviewSchema } from '~schemas/style';

export type StyleSummaryProps = {
  data: StyleOverviewSchema;
  compact?: boolean;
  hideCounts?: boolean;
};

const StyleSummary: React.FC<
  StyleSummaryProps & React.ComponentProps<typeof Box>
> = ({ data, compact = false, hideCounts = false, ...props }) => {
  return (
    <Flex
      {...props}
      alignItems={['center', 'flex-start']}
      className="style-summary"
    >
      <Box flex="0 0 auto">
        <AltLink display={['none', 'block']} href={`/${data.author.username}`}>
          <Avatar
            data={{
              id: data.author.id,
              nickname: data.author.nickname,
              profilePictureId: data.author.profilePicture?.id,
              username: data.author.username,
            }}
            size={36}
            lazy
          />
        </AltLink>
      </Box>
      <Box flex="auto" ml={['0.25rem', compact ? '0.56rem' : '0.75rem']}>
        <LineClamp color="gray100" lines={2} textAlign="left" textStyle="p2">
          <Text
            as="span"
            color="gray90"
            display={['none', 'inline']}
            fontWeight="bold"
            textStyle="p2"
          >
            {data.author.nickname}{' '}
          </Text>
          <Text as="span" color="gray100" textStyle="p2">
            {data.description}
          </Text>
        </LineClamp>
        {!hideCounts && (
          <Box mt="2px" textAlign="left">
            <Text as="span" color="gray60" mr="8px" textStyle="p3">
              좋아요 {data.likeCount.toLocaleString()}
            </Text>
            <Text as="span" color="gray60" textStyle="p3">
              댓글 {data.commentCount.toLocaleString()}
            </Text>
          </Box>
        )}
      </Box>
    </Flex>
  );
};

export default StyleSummary;
