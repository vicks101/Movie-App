import React from 'react';
import ReactDOM from 'react-dom';
import {createStore} from 'redux';
import movies from './reducers';
import './index.css';
import App from './components/App';

const store=createStore(movies);

ReactDOM.render(
  <App store={store}/>, document.getElementById('root')
);

