import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import Fish from './Fish';
import './base.css';
import Pythagoras from './Pythagoras';

var l = function (){return console.log.apply(console,arguments);}

ReactDOM.render(
	<App></App>,
	document.getElementById('root')
);

ReactDOM.render(
	<span className="myb">
		我是一个小小的模块
		<Fish width="100" height="200" big></Fish>
	</span>,
	document.getElementById('root2')
);
