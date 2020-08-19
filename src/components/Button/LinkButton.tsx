import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import { linkURL } from '~utils/funcs';
import pathnames from '~utils/pathnames';

import { BaseButton, BaseButtonProps } from './BaseButton';

const supportedPathnames = [
  pathnames.goodsDetail,
  pathnames.meNotifications,
  pathnames.store,
];

const LinkButtonWithIcon = styled(BaseButton)`
  text-indent: 11px;
`;

export type LinkButtonProps = BaseButtonProps &
  React.ComponentProps<typeof BaseButton> &
  JSX.IntrinsicElements['a'];

const LinkButton: React.FC<LinkButtonProps> = ({
  children,
  href,
  icon,
  display = 'inline-flex',
  useTransition = true,
  variant = 'solid-gray',
  ...props
}) => {
  const { url, supportedUrl } = useMemo<{
    supportedUrl: RegExp | undefined;
    url: string;
  }>(() => {
    const _url: string = typeof href === 'string' ? href : '';
    const linkPath: string = _url.split(/[?#]/)[0];
    const _supportedUrl: RegExp | undefined = supportedPathnames.find(
      (pattern) => !!pattern.exec(linkPath),
    );

    return { supportedUrl: _supportedUrl, url: _url };
  }, [href]);
  const Component = icon ? LinkButtonWithIcon : BaseButton;

  return (
    <Component
      {...(typeof supportedUrl !== 'undefined'
        ? { as: Link, to: href }
        : url.startsWith('stsh') ||
          url.includes('.styleshare.re') ||
          url.includes('.styleshare.kr') ||
          url.includes('.styleshare.me') ||
          !!/^http/.exec(url)
        ? { as: 'a', href }
        : { as: 'a', href: linkURL(url) })}
      display={display as string}
      useTransition={useTransition as boolean}
      variant={variant as string}
      {...props}
    >
      {children}
      {icon}
    </Component>
  );
};
LinkButton.displayName = 'LinkButton';

export default LinkButton;
