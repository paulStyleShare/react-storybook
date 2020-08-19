import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  *,
  *::before,
  *::after {
    box-sizing: border-box;
  }

  html,
  body {
    color: ${(props) => props.theme.colors.gray90};
    font-size: 16px;
    font-family: Spoqa Han Sans, Proxima Nova, Helvetica, Arial, Apple SD Gothic Neo, Nanum Gothic, Malgun Gothic, DotumChe, Dotum, sans-serif;
  }

  #app {
    display: flex;
    flex-direction: column;
    min-height: 100%;
  }

  a,
  button,
  input,
  optgroup,
  textarea,
  select {
    outline: none;
  }

  button,
  input,
  optgroup,
  textarea,
  select {
    background-color: transparent;
    border: 0;
  }

  a {
    text-decoration: none;
  }

  a,
  button {
    color: inherit;
    cursor: pointer;

    &:disabled {
      cursor: not-allowed;
    }
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6,
  p {
    margin: 0;
  }

  sup.sup--middle {
    top: -0.2em;
  }

  img {
    transform: translateZ(0);
    /* stylelint-disable */
    backface-visibility: hidden;
    -webkit-backface-visibility: hidden;
    -moz-backface-visibility: hidden;
    -webkit-transform: translateZ(0);
    -moz-transform: translateZ(0);
    /* stylelint-enable */
  }
`;

export const WebFontStyle = createGlobalStyle`
  @font-face {
  font-display: swap;
  font-weight: 700;
  font-family: "Spoqa Han Sans";
  src: local("Spoqa Han Sans Bold"),
    url("https://assets.styleshare.io/fonts/SpoqaHanSans/SpoqaHanSansBold.woff2") format("woff2"),
    url("https://assets.styleshare.io/fonts/SpoqaHanSans/SpoqaHanSansBold.woff") format("woff"),
    url("https://assets.styleshare.io/fonts/SpoqaHanSans/SpoqaHanSansBold.ttf") format("truetype");
  }

  @font-face {
    font-display: swap;
    font-weight: 400;
    font-family: "Spoqa Han Sans";
    src: local("Spoqa Han Sans Regular"),
      url("https://assets.styleshare.io/fonts/SpoqaHanSans/SpoqaHanSansRegular.woff2") format("woff2"),
      url("https://assets.styleshare.io/fonts/SpoqaHanSans/SpoqaHanSansRegular.woff") format("woff"),
      url("https://assets.styleshare.io/fonts/SpoqaHanSans/SpoqaHanSansRegular.ttf") format("truetype");
  }

  @font-face {
    font-display: swap;
    font-weight: 400;
    font-family: "Proxima Nova";
    font-style: normal;
    src: url("https://use.typekit.net/af/705e94/00000000000000003b9b3062/27/l?primer=7cdcb44be4a7db8877ffa5c0007b8dd865b3bbc383831fe2ea177f62257a9191&fvd=n4&v=3") format("woff2"),
      url("https://use.typekit.net/af/705e94/00000000000000003b9b3062/27/d?primer=7cdcb44be4a7db8877ffa5c0007b8dd865b3bbc383831fe2ea177f62257a9191&fvd=n4&v=3") format("woff"),
      url("https://use.typekit.net/af/705e94/00000000000000003b9b3062/27/a?primer=7cdcb44be4a7db8877ffa5c0007b8dd865b3bbc383831fe2ea177f62257a9191&fvd=n4&v=3") format("opentype");
  }

  @font-face {
    font-display: swap;
    font-weight: 700;
    font-family: "Proxima Nova";
    font-style: normal;
    src: url("https://use.typekit.net/af/949f99/00000000000000003b9b3068/27/l?primer=7cdcb44be4a7db8877ffa5c0007b8dd865b3bbc383831fe2ea177f62257a9191&fvd=n7&v=3") format("woff2"),
      url("https://use.typekit.net/af/949f99/00000000000000003b9b3068/27/d?primer=7cdcb44be4a7db8877ffa5c0007b8dd865b3bbc383831fe2ea177f62257a9191&fvd=n7&v=3") format("woff"),
      url("https://use.typekit.net/af/949f99/00000000000000003b9b3068/27/a?primer=7cdcb44be4a7db8877ffa5c0007b8dd865b3bbc383831fe2ea177f62257a9191&fvd=n7&v=3") format("opentype");
  }

  @font-face {
    font-display: swap;
    font-weight: 900;
    font-family: "Proxima Nova";
    font-style: normal;
    src: url("https://use.typekit.net/af/b683e3/00000000000000003b9b306c/27/l?primer=7cdcb44be4a7db8877ffa5c0007b8dd865b3bbc383831fe2ea177f62257a9191&fvd=n9&v=3") format("woff2"),
      url("https://use.typekit.net/af/b683e3/00000000000000003b9b306c/27/d?primer=7cdcb44be4a7db8877ffa5c0007b8dd865b3bbc383831fe2ea177f62257a9191&fvd=n9&v=3") format("woff"),
      url("https://use.typekit.net/af/b683e3/00000000000000003b9b306c/27/a?primer=7cdcb44be4a7db8877ffa5c0007b8dd865b3bbc383831fe2ea177f62257a9191&fvd=n9&v=3") format("opentype");
  }

  @font-face {
    font-display: swap;
    font-weight: 700;
    font-family: "Proxima Nova";
    font-style: italic;
    src: url("https://use.typekit.net/af/d32834/00000000000000003b9b306d/27/l?primer=7cdcb44be4a7db8877ffa5c0007b8dd865b3bbc383831fe2ea177f62257a9191&fvd=i9&v=3") format("woff2"),
      url("https://use.typekit.net/af/d32834/00000000000000003b9b306d/27/d?primer=7cdcb44be4a7db8877ffa5c0007b8dd865b3bbc383831fe2ea177f62257a9191&fvd=i9&v=3") format("woff"),
      url("https://use.typekit.net/af/d32834/00000000000000003b9b306d/27/a?primer=7cdcb44be4a7db8877ffa5c0007b8dd865b3bbc383831fe2ea177f62257a9191&fvd=i9&v=3") format("opentype");
  }
`;

export const AppGlobalStyle = createGlobalStyle`
  * {
    /* 웹뷰에서 모든 스크롤바를 숨김 */
    scrollbar-width: none;

    &::-webkit-scrollbar {
      display: none;
      appearance: none;
    }
  }

  html, body {
    /* 웹뷰에서 다 선택이 불가능하게 함 */
    user-select: none;
    touch-action: manipulation;
    /* stylelint-disable */
    /* 롱프레스 시 나오는 팝업을 제어 */
    -webkit-touch-callout: none;
    /* 링크 터치 시 기본 영역 색상을 제어 */
    -webkit-tap-highlight-color: rgba(0,0,0,0);
    -webkit-overflow-scrolling: touch;
    /* stylelint-enable */
  }
`;
export const WebGlobalStyle = createGlobalStyle`
 body {
    ${(props) => props.theme.mediaQueries.large} {
      min-width: 1280px;
      overflow-x: auto;
    }
  }
`;

export default GlobalStyle;
