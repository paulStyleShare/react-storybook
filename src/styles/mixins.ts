import { linearGradient, rem } from 'polished';
import {
  css,
  CSSObject,
  keyframes,
  SimpleInterpolation,
} from 'styled-components';

import { sizes } from './variables';

type SizeKeyType = keyof typeof sizes;
type MediaTemplateFn = (
  first: TemplateStringsArray | CSSObject,
  ...args: SimpleInterpolation[]
) => ReturnType<typeof css>;
interface MediaTemplate {
  up: (key: SizeKeyType) => MediaTemplateFn;
  down: (key: SizeKeyType) => MediaTemplateFn;
}

export const media: MediaTemplate = {
  down: (key: SizeKeyType) => (...args) => css`
    @media (max-width: ${rem(sizes[key] - 1)}) {
      ${css(...args)}
    }
  `,
  up: (key: SizeKeyType) => (...args) => css`
    @media (min-width: ${rem(sizes[key])}) {
      ${css(...args)}
    }
  `,
};

type SafeTemplateFn = (
  property: string,
  defautlValue?: number,
) => ReturnType<typeof css>;

interface SafeTemplate {
  left: SafeTemplateFn;
  right: SafeTemplateFn;
  top: SafeTemplateFn;
  bottom: SafeTemplateFn;
}
/**
 * 특정 방향의 env(safe-area-inset-...) 를 반환..?
 * 뭐라고 설명하지
 */
export const safe = ['left', 'right', 'top', 'bottom'].reduce(
  (res, direction) => {
    res[direction as keyof SafeTemplate] = (
      property: string,
      defaultValue = 0,
    ) => css`
      @supports (${property}: max(0px)) {
        ${property}: max(
          env(safe-area-inset-${direction}, constant(safe-area-inset-${direction}), 0px),
          ${rem(defaultValue)}
        );
      }
    `;

    return res;
  },
  {} as SafeTemplate,
);

const bgAnimation = keyframes`
  0% {
    background-position:0% 50%;
  }
  50% {
    background-position:100% 50%;
  }
  100% {
    background-position:0% 50%;
  }
`;
export const animatedLinearGradient = () => css`
  background-size: 400%;
  ${(props) =>
    linearGradient({
      colorStops: [props.theme.colors.gray20, props.theme.colors.gray10],
      fallback: props.theme.colors.alpha.white50,
      toDirection: 'to right',
    })};
  animation: ${bgAnimation} 1.2s ease infinite;
`;
