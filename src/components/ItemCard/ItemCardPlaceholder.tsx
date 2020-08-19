import React from 'react';
import { rem } from 'polished';

import { Box, SkeletonBox } from '~components/common';

export type ItemCardPlaceholderProps = {
  compact?: boolean;
  showCounts?: boolean;
};
const ItemCardPlaceholder: React.FC<
  ItemCardPlaceholderProps & React.ComponentProps<typeof Box>
> = ({ compact = false, showCounts = true, ...props }) => {
  return (
    <Box {...props}>
      <SkeletonBox
        borderColor="gray20"
        borderRadius="8px"
        borderStyle="solid"
        borderWidth="1px"
        mb={[rem(9), compact ? rem(10) : rem(12)]}
        position="relative"
        pt="100%"
      />
      <Box px={[rem(2), compact ? rem(4) : rem(6)]}>
        <SkeletonBox
          height={rem(16)}
          mb={[rem(3), compact ? rem(3) : rem(4)]}
          width="20%"
        />
        <SkeletonBox
          height={rem(18)}
          mb={[rem(3), compact ? rem(3) : rem(12)]}
          width="85%"
        />
        <SkeletonBox
          display={['block', compact ? 'block' : 'none']}
          height={rem(16)}
          mb={[rem(14), compact ? rem(10) : rem(12)]}
          width="85%"
        />
        <SkeletonBox
          height={rem(16)}
          mb={[rem(5), compact ? rem(10) : rem(12)]}
          width="61%"
        />
        {showCounts && <SkeletonBox height={rem(16)} width="38%" />}
      </Box>
    </Box>
  );
};

export default ItemCardPlaceholder;
