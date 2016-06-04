/*globals module*/
import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import App from './App';

const rootEl = document.getElementById('root');

const render = app => 
  ReactDOM.render(
  <AppContainer>
    {app}
  </AppContainer>,
  rootEl
);


if(module.hot) {
  module.hot.accept('./App', () => {
    const UpdatedApp = require('./App').default;
    render(<UpdatedApp/>);
  });
}

render(<App/>);
