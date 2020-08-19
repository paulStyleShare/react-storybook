import 'core-js/stable';
import 'regenerator-runtime/runtime';

import React from 'react';
import { HashRouter as Router } from 'react-router-dom';

import App from '~shared/App';

const Root = () => (
  <Router>
    <App />
  </Router>
);

export default Root;
