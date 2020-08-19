import React from 'react';
import { css } from 'styled-components';

import defaultProfileImage from '~assets/images/empty-avatar.png';
import { staticURL } from '~utils/funcs';

import { Picture } from '../Picture';

export type AvatarProps = {
  data: AvatarData;
  size?: number;
  scale?: boolean;
  lazy?: boolean;
};

type AvatarData = {
  id: number;
  nickname: string;
  username: string;
  profilePictureId: string | number | null;
};

const DEFAULT_AVATAR_SIZE = 44;

/**
 * 아바타 이미지 컴포넌트
 */
const Avatar: React.FC<AvatarProps> = ({
  data,
  size = DEFAULT_AVATAR_SIZE,
  scale = false,
  lazy = false,
  ...props
}) => {
  let src: string;
  let srcSet: string | undefined;

  if (data.profilePictureId !== null && data.profilePictureId !== undefined) {
    src = staticURL(data.profilePictureId, size, size);
    srcSet = [1, 2, 3]
      .map(
        (ratio) =>
          `${staticURL(
            data.profilePictureId as string | number,
            size * ratio,
            size * ratio,
          )} ${ratio}x`,
      )
      .join(', ');
  } else {
    src = defaultProfileImage;
    srcSet = undefined;
  }

  return (
    <Picture
      alt={data.username}
      css={css`
        width: ${size}px;
        height: ${size}px;
        overflow: hidden;
        border: 1px solid ${({ theme }) => theme.colors.gray20};
        border-radius: 100%;
      `}
      imageHeight={size}
      imageWidth={size}
      lazy={lazy}
      scale={scale}
      src={src}
      srcSet={srcSet}
      {...props}
    />
  );
};

export default Avatar;
