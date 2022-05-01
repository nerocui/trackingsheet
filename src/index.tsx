import ReactDOM from 'react-dom';
import './index.css';
import { App } from './router';
import './hooks/useFirebase';
import * as React from 'react';

ReactDOM.render(
  <React.StrictMode>
    <App/>
  </React.StrictMode>,
  document.getElementById('root')
);
