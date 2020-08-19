import React from 'react';

import { imgSrcSet } from '~utils/funcs';

import Picture, { PictureProps } from './Picture';
type Props = {
  src: string;
  rootDir: string;
  optimized: string[];
  imageId: number | string;
  imageHeight: number;
  imageWidth: number;
  className?: string;
} & Omit<PictureProps, 'src' | 'srcSet' | 'sources'>;

const Img: React.FC<Props> = ({
  rootDir = './images/',
  src,
  optimized,
  imageWidth,
  imageHeight,
  ...props
}) => {
  const absoluteSrc = rootDir + src;
  const srcSet = imgSrcSet(absoluteSrc);

  return (
    <Picture
      imageHeight={imageHeight}
      imageWidth={imageWidth}
      src={absoluteSrc}
      srcSet={srcSet}
      {...props}
    />
  );
};

export default Img;
