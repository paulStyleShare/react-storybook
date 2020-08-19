import styled from 'styled-components';
import {
  border,
  BordersProps,
  compose,
  flexbox,
  FlexProps,
  layout,
  LayoutProps,
  space,
  SpaceProps,
} from 'styled-system';

export type ImgProps = SpaceProps & LayoutProps & BordersProps & FlexProps;

const Img = styled('img')<ImgProps>(
  {
    display: 'block',
  },
  compose(space, layout, border, flexbox),
);

Img.displayName = 'Img';

Img.defaultProps = {
  width: '100%',
};

export default Img;
