import React from 'react';

import { Box, Flex } from '~components/common';

export type StyleSummaryPlaceholderProps = {
  compact?: boolean;
};

const StyleSummaryPlaceholder: React.FC<
  StyleSummaryPlaceholderProps & React.ComponentProps<typeof Flex>
> = ({ compact = false, ...props }) => {
  return (
    <Flex {...props}>
      <Box
        bg="gray20"
        borderRadius="100%"
        display={['none', 'block']}
        height={compact ? '24px' : '36px'}
        mr={compact ? '9px' : '12px'}
        width={compact ? '24px' : '36px'}
      />
      <Box flex="auto">
        <Box
          bg="gray20"
          height="16px"
          mb={['4px', compact ? '4px' : '3px']}
          width={['139px', compact ? '154px' : '226px']}
        />
        <Box
          bg="gray20"
          height="16px"
          mb={['6px', '4px']}
          width={['127px', compact ? '154px' : '226px']}
        />
        <Box
          bg="gray20"
          height="16px"
          width={['116px', compact ? '105px' : '107px']}
        />
      </Box>
    </Flex>
  );
};

export default StyleSummaryPlaceholder;
