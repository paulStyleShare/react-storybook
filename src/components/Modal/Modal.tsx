import React, { FC, MouseEventHandler } from 'react';
import { motion } from 'framer-motion';
import styled, { css } from 'styled-components';
import { variant } from 'styled-system';

import { XLine } from '@styleshare/react-icons';
import { Box, Flex, Text } from '~components/common';

export type ModalProps = {
  size?: 'small' | 'medium' | 'big';
  title?: string;
  onCloseClick?: () => void;
};

const variants = {
  hidden: { opacity: 0, y: '-30%' },
  visible: {
    opacity: 1,
    y: '0%',
  },
};
const Modal: FC<ModalProps> = ({ children, title, onCloseClick, ...props }) => {
  const handleClick: MouseEventHandler<HTMLDivElement> = (e) =>
    e.stopPropagation();

  return (
    <MotionModal
      {...props}
      animate="visible"
      exit="hidden"
      initial="hidden"
      transition={{ duration: 0.25, ease: 'easeInOut' }}
      variants={variants}
      onClick={handleClick}
    >
      <Flex
        alignItems="center"
        borderBottom="1px solid"
        borderBottomColor="gray20"
        px="20px"
      >
        <Text
          color="gray90"
          flex="1"
          fontWeight="bold"
          mb="20px"
          mt="24px"
          textStyle="h4"
        >
          {title}
        </Text>
        <XLine height="24px" width="24px" onClick={onCloseClick} />
      </Flex>
      <Box overflowY="auto" p="24px">
        {children}
      </Box>
    </MotionModal>
  );
};
Modal.defaultProps = {
  size: 'small',
};

const MotionModal = styled(motion.div)(
  {
    borderRadius: '16px',
    maxHeight: 'calc(100vh - 360px)',
    minWidth: '420px',
    overflowX: 'hidden',
    overflowY: 'auto',
  },
  css`
    background: ${(props) => props.theme.colors.white};
    border: 1px solid ${(props) => props.theme.colors.gray20};
    box-shadow: ${(props) => props.theme.shadows.modal};
  `,
  variant({
    prop: 'size',
    variants: {
      big: {
        width: '1065px',
      },
      medium: {
        width: '635px',
      },
      small: {
        width: '420px',
      },
    },
  }),
);

export default Modal;
