import React, { useEffect, useRef } from 'react';
import { disableBodyScroll, enableBodyScroll } from 'body-scroll-lock';
import { Portal } from 'react-portal';

const ModalPortal: React.FC = ({ children }) => {
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    ref.current = document.getElementById('modal-portal');
  }, []);

  useEffect(() => {
    const curr = ref.current;

    if (!!curr && !!children && React.Children.count(children) > 0) {
      disableBodyScroll(curr);

      return () => {
        enableBodyScroll(curr);
      };
    }
  }, [children]);

  return (
    <Portal node={document && document.getElementById('modal-portal')}>
      {children}
    </Portal>
  );
};

export default ModalPortal;
