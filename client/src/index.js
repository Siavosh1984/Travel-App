// to have all dependencies,I need to run (npm i @material-ui/core @material-ui/icons @material-ui/lab axios jwt-decode material-ui-chip-input moment react-file-base64 react-google-login react-redux react-router-dom redux redux-thunk --legacy-peer-deps)
// I added (import ReactDOM from "react-dom/client";)
import React from "react";
import ReactDOM from "react-dom/client";
// redux : https://blog.logrocket.com/understanding-redux-tutorial-examples/
// "Provider" : https://javascript.plainenglish.io/what-is-a-provider-in-react-redux-ed5f6991550c
import { Provider } from 'react-redux';
// redux tutorial: https://redux.js.org/tutorials/fundamentals/part-1-overview
// Redux toolkit: https://redux-toolkit.js.org/introduction/getting-started
import {applyMiddleware, compose } from 'redux';
// to remove "createStore is deprecated" error we "import { legacy_createStore as createStore } from "redux";"
import { legacy_createStore as createStore } from "redux";
import thunk from 'redux-thunk';

import { reducers } from './reducers';
import App from "./App";
import './index.css';

const store = createStore(reducers, compose(applyMiddleware(thunk)));
// using "<Provider></Provider> my redux is ready to use and I have "store"
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <App />
  </Provider>,
);

