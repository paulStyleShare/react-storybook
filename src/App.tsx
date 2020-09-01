import 'core-js/stable';
import 'regenerator-runtime/runtime';

import React, { useEffect } from 'react';
import { Provider } from 'react-redux';
import { HashRouter as Router } from 'react-router-dom';

import { getMeProfile } from '~reduxes/me/actions';
import App from '~shared/App';

import configureStore from './store';

type InitialStore = ReturnType<typeof configureStore>;

const Root = () => {
  const reduxStore: InitialStore = configureStore();
  useEffect(() => {
    reduxStore.dispatch<any>(getMeProfile());
  }, [reduxStore]);

  return (
    <Provider store={reduxStore}>
      <Router>
        <App />
      </Router>
    </Provider>
  );
};

export default Root;
