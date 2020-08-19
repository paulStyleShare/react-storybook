import { cover } from 'polished';
import styled from 'styled-components';

import Box, { BoxProps } from './Box';

export type AbsoluteFillProps = BoxProps;

const AbsoluteFill = styled(Box)<AbsoluteFillProps>`
  ${cover()}
`;

AbsoluteFill.displayName = 'AbsoluteFill';

export default AbsoluteFill;
