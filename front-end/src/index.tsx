import { Toaster } from 'react-hot-toast';
import React from 'react';
import ReactDOM from 'react-dom';

import Routes from './Routes';

import './services/firebase'
import './styles/global.scss'

ReactDOM.render(
  <React.StrictMode>
    <Routes />
    <Toaster />
  </React.StrictMode>,
  document.getElementById('root')
);