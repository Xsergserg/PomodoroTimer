import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';
import {BrowserRouter, Route} from 'react-router-dom';

ReactDOM.render(
	(
		<BrowserRouter basename="/Project5">
			<Route path='/' component={App}/>
		</BrowserRouter>
	), 
	document.getElementById('root'));
serviceWorker.unregister();
