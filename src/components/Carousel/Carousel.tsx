/* eslint-disable react/display-name */
import React from 'react';
import Slider, { Settings as CarouselSettings } from 'react-slick';
import styled from 'styled-components';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

type Props = {
  settings: CarouselSettings;
};

const CustomCarousel: React.FC<Props> = ({ settings, children, ...props }) => {
  return (
    <Slider {...settings} {...props}>
      {children}
    </Slider>
  );
};
const StyledCustomCarousel = styled(CustomCarousel)`
  width: 100%;
`;
export default StyledCustomCarousel;
