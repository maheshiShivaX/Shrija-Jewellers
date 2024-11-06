import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import './assets/css/responsive.css'
import App from './App';
import reportWebVitals from './reportWebVitals';
import './assets/css/admin.css';
import { Provider } from 'react-redux';
import { createRoot } from 'react-dom/client';
import { createStore, applyMiddleware, compose } from "redux";
import rootReducer from "./redux/reducer/rootReducer";
import { thunk } from 'redux-thunk';

const store = createStore(rootReducer, compose(applyMiddleware(thunk)));
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store} >
      <App />
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
