import React, { ComponentProps } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import {
  compose,
  display,
  DisplayProps,
  flexbox,
  FlexboxProps,
  position,
  PositionProps,
} from 'styled-system';

import { linkURL } from '~utils/funcs';
import pathnames from '~utils/pathnames';

type LinkProps = ComponentProps<typeof Link>;
type StyledAnchorProps = DisplayProps & FlexboxProps & PositionProps;
const StyledAnchor = styled('a')<StyledAnchorProps>(
  { cursor: 'pointer' },
  compose(display, flexbox, position),
);

type Props = ComponentProps<typeof StyledAnchor> &
  Omit<LinkProps, 'to'> &
  Partial<Pick<LinkProps, 'to'>>;

const supportedPathnames = [
  pathnames.goodsDetail,
  pathnames.meNotifications,
  pathnames.store,
];

const AltLink: React.FC<Props> = ({ children, href, ...rest }) => {
  const url = typeof href === 'string' ? href : '';
  const linkPath = url.split(/[?#]/)[0];
  const supportedUrl = supportedPathnames.find(
    (pattern) => !!pattern.exec(linkPath),
  );

  return typeof supportedUrl !== 'undefined' ? (
    <StyledAnchor as={Link} to={href} {...rest}>
      {children}
    </StyledAnchor>
  ) : url.startsWith('stsh') ||
    url.includes('.styleshare.re') ||
    url.includes('.styleshare.kr') ||
    url.includes('.styleshare.me') ||
    !!/^http/.exec(url) ? (
    <StyledAnchor {...rest} href={href}>
      {children}
    </StyledAnchor>
  ) : (
    <StyledAnchor {...rest} href={linkURL(url)}>
      {children}
    </StyledAnchor>
  );
};

export default AltLink;
