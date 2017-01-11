import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './base.css';


var l = function (){return console.log.apply(console,arguments);}
l(React)
l(ReactDOM)

ReactDOM.render(
	<span className="myb">我是一个小小的模块</span>,
	document.getElementById('root')
);

ReactDOM.render(
	<App></App>,
	document.getElementById('root2')
);