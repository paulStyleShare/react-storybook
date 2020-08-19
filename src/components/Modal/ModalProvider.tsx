import React, { Component } from 'react';
import { AnimatePresence } from 'framer-motion';

import { ModalContext, ModalInput } from '~contexts/modal';
import { nanoid } from '~utils/nanoid';

import ModalContainer from './ModalContainer';
import ModalPortal from './ModalPortal';

type State = {
  [key: string]: ModalInput | null;
};

export default class ModalProvider extends Component<
  Record<string, unknown>,
  State
> {
  state: State = {};

  add = (input: ModalInput): void => {
    const id = nanoid(10);

    this.setState((prevState) => ({
      ...prevState,
      [id]: input,
    }));
  };

  remove = (id: string): void => {
    this.setState((prevState) => ({
      ...prevState,
      [id]: null,
    }));
  };

  // eslint-disable-next-line @typescript-eslint/member-ordering
  contextValues = { add: this.add, remove: this.remove, stack: this.state };

  render(): JSX.Element {
    const entries = Object.entries(this.state).filter(([, value]) => !!value);

    return (
      <ModalContext.Provider value={this.contextValues}>
        {this.props.children}
        <AnimatePresence>
          <ModalPortal>
            {entries.map(([key, value]) =>
              value ? (
                <ModalContainer {...value} key={key} id={key}>
                  {value.render()}
                </ModalContainer>
              ) : null,
            )}
          </ModalPortal>
        </AnimatePresence>
      </ModalContext.Provider>
    );
  }
}
