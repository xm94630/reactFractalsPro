
import React from 'react';

const Fish = ({ lv,width,height,big}) => {
	console.log(width)
	console.log(height)
	console.log(lv)
	console.log(big)
    return (
        <div>小鱼的宽度是{width}，高度是{height}</div>
    );
};


export default Fish;
