import styled from 'styled-components';
import {
  layout,
  LayoutProps,
  space,
  SpaceProps,
  textStyle,
  TextStyleProps,
} from 'styled-system';

type Props = SpaceProps & LayoutProps & TextStyleProps;

const TextField = styled.textarea<Props>`
  ${space}
  ${layout}
  ${textStyle}
  border: 1px solid;
  border-color: ${(props) => props.theme.colors.gray40};
  border-radius: 8px;
  color: ${(props) => props.theme.colors.gray90};
  display: block;
  resize: none;

  &::placeholder {
    color: ${(props) => props.theme.colors.gray50};
  }
`;
TextField.defaultProps = {
  px: '1.25rem',
  py: '1.25rem',
  width: '100%',
};

export default TextField;
