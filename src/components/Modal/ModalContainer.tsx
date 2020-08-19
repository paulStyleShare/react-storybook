import React, { useCallback, useContext, useMemo } from 'react';
import { motion } from 'framer-motion';
import { rgba } from 'polished';
import styled from 'styled-components';

import { ModalContext } from '~contexts/modal';
import { colors } from '~styles/theme/desktop';

import Modal, { ModalProps } from './Modal';

type Props = {
  id: string;
};

const transition = {
  duration: 0.25,
  ease: 'easeInOut',
};
const ModalContainer: React.FC<Props & ModalProps> = ({
  children,
  id,
  ...props
}) => {
  const { remove: removeModal } = useContext(ModalContext);
  const variants = useMemo(
    () => ({
      hidden: {
        background: rgba(colors.gray100, 0),
      },
      visible: {
        background: rgba(colors.gray100, 0.3),
      },
    }),
    [],
  );

  const handleCloseClick = useCallback(() => removeModal(id), [
    id,
    removeModal,
  ]);
  // TODO: ESC close effect
  // TODO: outside click close effect

  return (
    <MotionModalContainer
      animate="visible"
      exit="hidden"
      initial="hidden"
      transition={transition}
      variants={variants}
      onClick={handleCloseClick}
    >
      <Modal {...props} onCloseClick={handleCloseClick}>
        {children}
      </Modal>
    </MotionModalContainer>
  );
};
const MotionModalContainer = styled(motion.div)`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100vw;
  height: 100vh;
`;

export default ModalContainer;
