import React from 'react';
import { em } from 'polished';
import styled, { css } from 'styled-components';

import PhotoLine from '@styleshare/react-icons/lib/components/PhotoLine';
import Box from '~components/common/Box';
import { ResponsivePicture } from '~components/Picture';

export type BaseCardPictureProps = {
  /**
   * 숫자 혹은 문자인 이미지 아이디
   */
  imageId: number | string;
  /**
   * 이미지의 너비, 이미지 비율을 계산하는데 사용됩니다.
   * Box에 width나 max-width를 정하지 않으면 기본값으로 사용됩니다.
   */
  imageWidth: number;
  /**
   * 이미지의 높이, 이미지의 비율을 계산하는데 사용됩니다.
   * Box에 height나 max-height를 정하지 않으면 기본값으로 사용됩니다.
   */
  imageHeight: number;
  alt: string;
  sizes?: string;
  /**
   * 이미지가 여러장이라면 `true`
   * 우상단에 이미지가 여러장임을 나타내는 아이콘이 보입니다.
   */
  plural?: boolean;
};

/**
 * Card 컴포넌트에 사용되는 이미지
 */
const BaseCard: React.FC<
  BaseCardPictureProps & React.ComponentProps<typeof Box>
> = ({
  imageId,
  imageWidth,
  imageHeight,
  alt,
  sizes = `50vw, (min-width: ${em(1024)}): 25vw`,
  plural = false,
  children,
  ...props
}) => {
  return (
    <div
      css={css`
        position: relative;
        overflow: hidden;
        border: 1px solid ${({ theme }) => theme.colors.gray20};
        border-radius: 8px;
      `}
      {...props}
    >
      <ResponsivePicture
        alt={alt}
        imageHeight={imageHeight}
        imageId={imageId}
        imageWidth={imageWidth}
        sizes={sizes}
        lazy
        scale
      />
      {plural && (
        <ShadowPhotoIcon
          fill="white"
          height={['16px', '21px']}
          position="absolute"
          right={['7px', '9.5px']}
          top={['7px', '9.5px']}
          width={['16px', '21px']}
        />
      )}
      {children}
    </div>
  );
};

const ShadowPhotoIcon = styled(PhotoLine)`
  filter: url(#dropshadow);
`;

export default BaseCard;
