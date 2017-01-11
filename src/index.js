import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import Fish from './Fish';
import './base.css';


var l = function (){return console.log.apply(console,arguments);}
l(React)
l(ReactDOM)


ReactDOM.render(
	<App></App>,
	document.getElementById('root')
);

ReactDOM.render(
	<span className="myb">
		我是一个小小的模块
		<Fish width="100" height="200"></Fish>
	</span>,
	document.getElementById('root2')
);