import React from 'react';

import { staticURL } from '~utils/funcs';

import Picture, { PictureProps } from './Picture';

type Props = {
  imageId: number | string;
  imageHeight: number;
  imageWidth: number;
  className?: string;
} & Omit<PictureProps, 'src' | 'srcSet' | 'sources'>;

const ratios = [1, 2, 3];

/**
 * FixePicture는 고정된 크기의 이미지를 사용할 때 유용하며
 * {@link https://html.spec.whatwg.org/multipage/images.html#pixel-density-descriptor|pixel density descriptor}
 * (1x, 2x, 3x)를 사용합니다.
 */
const FixedPicture: React.FC<Props> = ({
  imageId,
  imageWidth,
  imageHeight,
  ...props
}) => {
  const src = staticURL(imageId, imageWidth, imageHeight);
  const srcSet = ratios
    .map(
      (ratio) =>
        `${staticURL(
          imageId,
          imageWidth * ratio,
          imageHeight * ratio,
        )} ${ratio}x`,
    )
    .join(', ');

  return (
    <Picture
      imageHeight={imageHeight}
      imageWidth={imageWidth}
      src={src}
      srcSet={srcSet}
      {...props}
    />
  );
};

export default FixedPicture;
