import styled from 'styled-components';

import { animatedLinearGradient } from '~styles/mixins';

import Box from './Box';

const SkeletonBox = styled(Box)`
  ${animatedLinearGradient()}
`;
SkeletonBox.defaultProps = {
  borderRadius: '2px',
};

export default SkeletonBox;
