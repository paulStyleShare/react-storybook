import { createContext } from 'react';

import { ModalProps } from '~components/Modal/Modal';

export type ModalInput = {
  render: () => React.ReactNode;
} & ModalProps;

export interface ModalContextValues {
  add: (input: ModalInput) => void;
  remove: (id: string) => void;
  stack: {
    [key: string]: ModalInput | null;
  };
}

export const ModalContext = createContext<ModalContextValues>({
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  add: (input: ModalInput) => {
    /*  */
  },
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  remove: (id: string) => {
    /* */
  },
  stack: {} as ModalContextValues['stack'],
});
