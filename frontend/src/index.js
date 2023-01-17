import React from 'react';
import { ModalProvider, Modal } from './context/Modal';

import './index.css';

import ReactDOM from 'react-dom';
import { Provider as Redux } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { restoreCSRF, csrfFetch } from './store/csrf';

import configureStore from './store';
import * as sessionActions from './store/session';

const store = configureStore();

if (process.env.NODE_ENV !== 'production') {
  restoreCSRF();

  window.csrfFetch = csrfFetch;
  window.store = store;
  window.sessionActions = sessionActions;
}

function Root() {
  return (
    <ModalProvider>
      <Redux store={store}>
        <BrowserRouter>
          <App />
          <Modal />
        </BrowserRouter>
      </Redux>
    </ModalProvider>
  );
}

ReactDOM.render(
  <React.StrictMode>
    <Root />
  </React.StrictMode>,
  document.getElementById('root')
);
