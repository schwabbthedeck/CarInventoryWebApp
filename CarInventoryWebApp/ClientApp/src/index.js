import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';
import './index.css';
import React from 'react';
import ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';
import Inventory from './components/Inventory';

const rootElement = document.getElementById('root');

ReactDOM.render(<Inventory />, rootElement);

registerServiceWorker();
