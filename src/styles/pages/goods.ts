import { rem } from 'polished';
import { createGlobalStyle } from 'styled-components';

import { media } from '~styles/mixins';

const GoodsDetailStyle = createGlobalStyle`
  body {
    ${media.down('mobile')`
      margin-bottom: ${rem(72)}; 
    `}
  }
`;

export default GoodsDetailStyle;
