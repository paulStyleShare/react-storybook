import React from 'react';

import { staticURL } from '~utils/funcs';

import Picture, { PictureProps } from './Picture';

type Props = {
  imageId: number | string;
  /**
   * @default '100vw'
   */
  sizes?: string;
  imageHeight: number;
  imageWidth: number;
} & Omit<PictureProps, 'src' | 'srcSet' | 'sources'>;

const widths = [
  // 120,
  // 180,
  // 200,
  // 250,
  // 320,
  // 360,
  // 480,
  560,
  // 750,
  // 975,
  1024,
  // 1280,
  // 1320,
  // 1336,
  1480,
  // 1600,
];

/**
 * ResponsivePicture는 screen size에 따라 알맞은 크기의 이미지를 보여줘야 할 때 유용하며
 * {@link https://html.spec.whatwg.org/multipage/images.html#width-descriptor|width descriptor}
 * (w)를 사용합니다.
 */

const ResponsivePicture: React.FC<Props> = ({
  imageId,
  imageWidth,
  imageHeight,
  sizes = '100vw',
  ...props
}) => {
  const imageRatio = imageHeight / imageWidth;

  // src 는 일반적으로 IE 에서 불러오므로 2배수 하여 낮은 해상도 해결
  const src = staticURL(imageId, imageWidth * 2, imageHeight * 2);
  // const src = staticURL(imageId, imageWidth, imageHeight);
  const srcSet = widths
    .map(
      (width) =>
        `${staticURL(imageId, width, Math.ceil(width * imageRatio))} ${width}w`,
    )
    .join(', ');

  return (
    <Picture
      imageHeight={imageHeight}
      imageWidth={imageWidth}
      sizes={sizes}
      src={src}
      srcSet={srcSet}
      {...props}
    />
  );
};

export default ResponsivePicture;
