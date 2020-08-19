import styled from 'styled-components';
import {
  alignSelf,
  AlignSelfProps,
  background,
  BackgroundProps,
  border,
  BordersProps,
  boxShadow,
  BoxShadowProps,
  color,
  ColorProps,
  compose,
  flex,
  flexBasis,
  FlexBasisProps,
  FlexGrowProps,
  FlexProps,
  FlexShrinkProps,
  justifySelf,
  JustifySelfProps,
  layout,
  LayoutProps,
  order,
  OrderProps,
  overflow,
  OverflowProps,
  position,
  PositionProps,
  space,
  SpaceProps,
  system,
  textAlign,
  TextAlignProps,
} from 'styled-system';

export type BoxProps = SpaceProps &
  ColorProps &
  LayoutProps &
  PositionProps &
  OverflowProps &
  FlexProps &
  FlexBasisProps &
  FlexGrowProps &
  FlexShrinkProps &
  AlignSelfProps &
  JustifySelfProps &
  OrderProps &
  BordersProps &
  BackgroundProps &
  BoxShadowProps &
  TextAlignProps;

const Box = styled('div')<BoxProps>(
  {
    boxSizing: 'border-box',
  },
  compose(
    space,
    color,
    layout,
    position,
    overflow,
    flex,
    flexBasis,
    alignSelf,
    justifySelf,
    order,
    border,
    boxShadow,
    background,
    textAlign,
  ),
  system({
    flexGrow: true,
    flexShrink: true,
  }),
);

Box.displayName = 'Box';

export default Box;
