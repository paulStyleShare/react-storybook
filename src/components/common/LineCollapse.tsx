import React, {
  ComponentProps,
  FC,
  memo,
  useCallback,
  useEffect,
  useState,
} from 'react';
import { motion } from 'framer-motion';
import { rem } from 'polished';
import { Portal } from 'react-portal';
import styled from 'styled-components';

import useRect from '~hooks/useRect';

import LineClamp from './LineClamp';
import Text from './Text';
import { BaseButton } from '../Button/BaseButton';

type Props = { lines: number } & ComponentProps<typeof Text>;

const HiddenArea = styled.div`
  position: fixed;

  & > p {
    white-space: pre-line;
    word-break: break-all;
    visibility: hidden;
    opacity: 0;
  }
`;
const StyledText = styled(Text)`
  white-space: pre-line;
  word-break: break-all;
`;
const StyledMotion = styled(motion.p)`
  margin-bottom: ${rem(16)};
  overflow: hidden;
  white-space: pre-line;
  text-overflow: ellipsis;
  word-break: break-all;
`;

/**
 * `lines` 이상의 텍스트가 있는 경우 `더 보기` 버튼을 노출합니다.
 * 그 이상의 길이가 아닐 경우에는 그냥 `<Text />`를 렌더합니다.
 */
const LineCollapse: FC<Props> = ({ as, lines, children, ...props }) => {
  const [expanded, setExpanded] = useState<undefined | null | boolean>(
    undefined,
  );
  const [lineClampRect, lineClampRef] = useRect<HTMLParagraphElement>();
  const [textRect, textRef] = useRect<HTMLParagraphElement>();

  const variants = {
    hidden: {
      maxHeight: lineClampRect !== null ? lineClampRect.height : 0,
    },
    visible: {
      maxHeight: textRect !== null ? 'none' : 0,
    },
  };

  const handleClick = useCallback(() => setExpanded((prev) => !prev), []);

  useEffect(() => {
    if (lineClampRect !== null && textRect !== null) {
      if (textRect.height > lineClampRect.height) {
        setExpanded(false);
      } else {
        setExpanded(null);
      }
    }
  }, [lineClampRect, textRect]);

  return (
    <>
      {(() => {
        if (expanded === null) {
          return (
            <StyledText as={as} {...props}>
              {children}
            </StyledText>
          );
        }
        if (typeof expanded === 'boolean') {
          return [
            <StyledMotion
              key="text"
              animate={expanded ? 'visible' : 'hidden'}
              as={as}
              initial="hidden"
              transition={{ duration: 0.25, ease: 'easeInOut' }}
              variants={variants}
            >
              <Text as="span" {...props}>
                {children}
              </Text>
            </StyledMotion>,
            <BaseButton
              key="button"
              fontWeight="normal"
              textStyle="p2"
              type="button"
              variant="text-green"
              onClick={handleClick}
            >
              {expanded ? '닫기' : '더 보기'}
            </BaseButton>,
          ];
        }
        return null;
      })()}
      <Portal>
        <HiddenArea>
          <LineClamp lines={lines} {...props} ref={lineClampRef} as="p">
            {children}
          </LineClamp>
          <Text {...props} ref={textRef} as="p">
            {children}
          </Text>
        </HiddenArea>
      </Portal>
    </>
  );
};
export default memo(LineCollapse);
