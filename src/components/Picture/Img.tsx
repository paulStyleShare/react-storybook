import React from 'react';

import { imgSrcSet } from '~utils/funcs';

import Picture, { PictureProps } from './Picture';
type Props = {
  src: string;
  rootDir?: string;
  responsive?: boolean;
  optimized?: string[];
  imageHeight?: number;
  imageWidth?: number;
  className?: string;
} & Omit<PictureProps, 'alt' | 'src' | 'srcSet' | 'sources'>;

const Img: React.FC<Props> = ({
  rootDir = './assets/',
  responsive = true,
  src,
  optimized,
  imageWidth,
  imageHeight,
  ...props
}) => {
  const absoluteSrc = rootDir + src;
  if (responsive) {
    const srcSet = imgSrcSet(src, rootDir);
    return (
      <Picture
        alt={absoluteSrc}
        imageHeight={imageHeight}
        imageWidth={imageWidth}
        src={absoluteSrc}
        srcSet={srcSet}
        {...props}
      />
    );
  }
  return (
    <Picture
      alt={absoluteSrc}
      imageHeight={imageHeight}
      imageWidth={imageWidth}
      src={absoluteSrc}
      {...props}
    />
  );
};

export default Img;
