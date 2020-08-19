import React, { useEffect } from 'react';
import { cover } from 'polished';
import { css } from 'styled-components';
import LazyLoad from 'vanilla-lazyload';

import { darkenHover } from '~styles/image';
import { animatedLinearGradient } from '~styles/mixins';

export type PictureProps = {
  /**
   * lazy load를 사용할지
   *
   * @default false
   */
  lazy?: boolean;
  /**
   * hover transform scale을 사용할지
   *
   * @default false
   */
  scale?: boolean;
  /**
   * hover 시에 어둡게 하는 애니메이션 넣을지
   *
   * @default false
   */
  hover?: boolean;
  /**
   * img 태그에 전달됩니다.
   */
  alt: string;
  /**
   * img 태그에 전달됩니다.
   */
  src: string;
  /**
   * img 태그에 전달됩니다.
   */
  srcSet?: string;
  /**
   * img 태그에 전달됩니다.
   */
  sizes?: string;
  /**
   * media query에 따라 다른 이미지를 렌더하거나 webp같은 다른 이미지 포맷을 사용하고 싶다면 sources를 이용하세요.
   */
  sources?: { srcSet: string; media?: string; sizes?: string; type?: string }[];
  /**
   * imageWidth와 imageHeight 값을 함께 명시하면 이미지 로딩이 완료되기 이전에도 layout 영역을 차지하고 있어서 CSS reflow를 발생시키지 않을 수 있습니다.
   */
  imageWidth?: number;
  /**
   * imageWidth와 imageHeight 값을 함께 명시하면 이미지 로딩이 완료되기 이전에도 layout 영역을 차지하고 있어서 CSS reflow를 발생시키지 않을 수 있습니다.
   */
  imageHeight?: number;
  /**
   * css 클래스명을 추가합니다.
   */
  className?: string;
};

// Only initialize it one time for the entire application
if (typeof document !== 'undefined' && !document.lazyLoadInstance) {
  document.lazyLoadInstance = new LazyLoad({
    elements_selector: 'img.lazy',
  });
}

/**
 * Art Direction과 Resolution Switching을 지원하기 위한 반응형 이미지 컴포넌트입니다.
 * ImageShare (https://usercontents-c.styleshare.io) 이미지를 사용한다면 웬만하면 이 컴포넌트 대신
 * FixedPicture 또는 를 사용하기를 권장합니다.
 *
 * 공용 컴포넌트는 차 후 리팩토링 후 modules 폴더로 옮길 예정 입니다.
 *
 * 본 컴포넌트를 계속 사용 하실거라면 alias 된 modules/common 의 것을 import 해 주세요.
 */
const Picture: React.FC<PictureProps> = ({
  alt,
  lazy = false,
  hover = false,
  scale = false,
  src,
  srcSet,
  sizes,
  sources,
  imageWidth,
  imageHeight,
  ...props
}) => {
  useEffect(() => {
    if (lazy && typeof document !== 'undefined' && document.lazyLoadInstance) {
      /* eslint-disable */
      document.lazyLoadInstance.update();
      /* eslint-enable */
    }
  }, [lazy]);

  const hasSize =
    typeof imageHeight === 'number' && typeof imageWidth === 'number';

  return (
    /* TODO: 최 외곽의 div 역할은 picture 요소로도 충분할 것 같습니다. */
    <div
      css={css`
        position: relative;
        overflow: hidden;
        transform: translateZ(0);
        ${hover && darkenHover}
      `}
      {...props}
    >
      {/* CSS Reflow 방지 */}
      {/* TODO: width & height 를 이용하여 비율 맞추는건 ::before 와 같은 seudo element 로 가능합니다. */}
      {hasSize && (
        <div
          style={{
            paddingBottom: `${
              parseFloat(
                ((imageHeight as number) / (imageWidth as number)).toFixed(2),
              ) * 100
            }%`,
          }}
        />
      )}
      <picture>
        {sources &&
          sources.map(({ media, sizes, type, srcSet }, index) => (
            <source
              key={index}
              media={media}
              sizes={sizes}
              type={type}
              {...{ [lazy ? 'data-srcset' : 'srcSet']: srcSet }}
            />
          ))}
        <img
          alt={alt}
          className={lazy ? 'lazy' : undefined}
          {...{
            [lazy ? 'data-src' : 'src']: src,
            [lazy ? 'data-srcset' : 'srcSet']: srcSet,
            [lazy ? 'data-sizes' : 'sizes']: sizes,
          }}
          css={css`
            display: block;
            width: 100%;
            height: 100%;

            ${hasSize && cover()}

            ${({ theme }) => theme.mediaQueries.large} {
              ${scale &&
              `
            transition-property: transform;
            transition-duration: 250ms;
            transition-timing-function: ease-in-out;

            &:hover {
              transform: scale(1.1) translateZ(0);
            }

              `}
            }

            &.lazy {
              opacity: 0;
              transition-timing-function: ease-in-out;
              transition-duration: 250ms;
              transition-property: opacity;

              &:not(.loaded):before {
                ${cover()}
                ${animatedLinearGradient()}
              }

              &.loaded {
                opacity: 1;
              }

              ${({ theme }) => theme.mediaQueries.large} {
                ${scale &&
                `
                transition-property: transform, opacity;
              `}
              }
            }
          `}
        />
      </picture>
    </div>
  );
};

export default Picture;
