import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { prepareClientPortals } from '../';

// We need to remove server-rendered Portals or React on the client will clear
// out the container element and refuse to render there.
prepareClientPortals();

ReactDOM.hydrate(
  <App />,
  document.querySelector('#root'),
);
