import React from 'react';
import ReactDOM from 'react-dom';
import Routes from './Routes';

import './services/firebase'
import './styles/global.scss'

ReactDOM.render(
  <React.StrictMode>
    <Routes />
  </React.StrictMode>,
  document.getElementById('root')
);