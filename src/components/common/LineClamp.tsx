import React, { ComponentProps, forwardRef, useMemo } from 'react';
import { math } from 'polished';
import styled from 'styled-components';
import { system } from 'styled-system';

import { mediaQueries, textStyles } from '~styles/theme/desktop';

import Text from './Text';

type LinesType = number | (number | null)[];

export type LineClampProps = {
  lines: LinesType;
  /**
   * @default true
   */
  keepHeight?: boolean;
};

function convertToArray<T>(value: T | T[]) {
  if (Array.isArray(value)) {
    return value;
  } else {
    return [value];
  }
}

function getFilledArray<T = string>(arr: T[], length: number) {
  return Array.from({ length }, (v, i) =>
    i < arr.length ? arr[i] : arr[arr.length - 1],
  );
}

const LineClamp = forwardRef<
  HTMLParagraphElement,
  LineClampProps & ComponentProps<typeof Text>
>(({ keepHeight, lines, textStyle = 'p1', ...props }, ref) => {
  const height = useMemo(() => {
    const _lines = convertToArray(lines);
    const textStyleKeys: (keyof typeof textStyles)[] = convertToArray(
      textStyle as keyof typeof textStyles,
    );
    const queries = [null, mediaQueries.large];

    const maxLength = Math.max(
      _lines.length,
      textStyleKeys.length,
      queries.length,
    );
    const filledLines = getFilledArray(_lines, maxLength);
    const filledTextStyleKeys = getFilledArray(textStyleKeys, maxLength);

    return queries.map((media, index) => {
      const textStyle = textStyles[filledTextStyleKeys[index]];
      /* eslint-disable */
      const fontSize =
        // @ts-ignore
        (media && textStyle[media] && textStyle[media].fontSize) ||
        textStyle.fontSize;
      const lineHeight =
        // @ts-ignore
        (media && textStyle[media] && textStyle[media].lineHeight) ||
        textStyle.lineHeight;
      /* eslint-enable */

      return math(
        `${fontSize as string} * ${lineHeight as number} * ${
          filledLines[index] as number
        }`,
      );
    });
  }, [lines, textStyle]);

  return (
    <StyledLineClamp
      ref={ref}
      height={height}
      keepHeight={keepHeight}
      lines={lines}
      textStyle={textStyle as keyof typeof textStyles}
      {...props}
    />
  );
});
LineClamp.displayName = 'LineClamp';
LineClamp.defaultProps = {
  color: 'gray90',
  fontWeight: 'normal',
  textStyle: 'p1',
};

const StyledLineClamp = styled(Text)<LineClampProps & { height: string[] }>`
  display: -webkit-box;
  height: ${(props) => (props.keepHeight ? undefined : props.height[0])};
  max-height: ${(props) => (props.keepHeight ? props.height[0] : undefined)};
  overflow: hidden;
  text-decoration: none;
  text-overflow: ellipsis;
  word-break: break-all;
  -webkit-box-orient: vertical;

  ${(props) => props.theme.mediaQueries.large} {
    height: ${(props) => (props.keepHeight ? undefined : props.height[1])};
    max-height: ${(props) => (props.keepHeight ? props.height[1] : undefined)};
  }

  ${system({ lines: { property: 'WebkitLineClamp' } })}
`;

export default LineClamp;
