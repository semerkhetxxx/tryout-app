import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import { store } from './models/initStore';
import 'bootstrap/dist/css/bootstrap.css';
import './custom.css';
import AppRoot from './App';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(<Provider store={ store }><AppRoot /></Provider>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
