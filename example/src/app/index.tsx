import React from 'react';
import ReactDOM from 'react-dom';
import { hot } from 'react-hot-loader';
import { App } from './components/app';

const Root = hot(module)(() => <App />);
ReactDOM.render(<Root />, document.getElementById('root'));