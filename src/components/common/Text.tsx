import { WordBreakProperty } from 'csstype';
import styled from 'styled-components';
import {
  alignSelf,
  AlignSelfProps,
  color,
  compose,
  display,
  DisplayProps,
  /**
   * Flex Item Props
   */
  flex,
  FlexProps,
  fontWeight,
  FontWeightProps,
  justifySelf,
  JustifySelfProps,
  /**
   * position
   * zIndex
   * top
   * right
   * bottom
   * left
   */
  position,
  PositionProps,
  shadow,
  /**
   * margin, m
   * marginTop, mt
   * marginRight, mr
   * marginBottom, mb
   * marginLeft, ml
   * marginX, mx
   * marginY, my
   * padding, p
   * paddingTop, pt
   * paddingRight, pr
   * paddingBottom, p
   * paddingLeft, pl
   * paddingX, px
   * paddingY, py
   */
  space,
  SpaceProps,
  system,
  /**
   * textStyle
   * color
   * textShadow
   * fontWeight
   * textAlign
   */
  textAlign,
  TextAlignProps,
  TextColorProps,
  TextShadowProps,
  textStyle,
  TextStyleProps,
} from 'styled-system';

export type TextProps = SpaceProps &
  TextColorProps &
  TextShadowProps &
  TextAlignProps &
  FontWeightProps &
  DisplayProps &
  PositionProps &
  FlexProps &
  AlignSelfProps &
  JustifySelfProps &
  TextStyleProps & {
    wordBreak?: WordBreakProperty;
  };

const Text = styled('p')<TextProps>(
  {
    boxSizing: 'border-box',
    margin: 0,
  },
  system({
    wordBreak: true,
  }),
  compose(
    alignSelf,
    color,
    display,
    flex,
    fontWeight,
    justifySelf,
    position,
    shadow,
    space,
    textAlign,
    textStyle,
  ),
);

Text.displayName = 'Text';

Text.defaultProps = {
  color: 'gray100',
  fontWeight: 'normal',
  textStyle: 'p1',
};

export default Text;
