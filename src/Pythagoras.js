
import React,{Component} from 'react';
import { interpolateViridis } from 'd3-scale';
var l = function (){return console.log.apply(console,arguments);}

Math.deg = function(radians) {
  return radians * (180 / Math.PI);
};

//具有记忆功能的实现
//这个非常有意思。以为在递归计算的时候，计算的参数都是一样的，最后得出特定的结构
//那么在众多的调用中，就会出现重复的计算
//这里就是把计算过一次的结果记录下来！！下次调用的时候，遇到参数一样的话，我们就可以从存储的对象中获取！！
const memoizedCalc = function () {
    const memo = {};

    const key = ({ w, h, heightFactor, lean }) => [w, h, heightFactor, lean].join('-');

    return (args) => {
        const memoKey = key(args);

        if (memo[memoKey]) {
            return memo[memoKey];
        }else{
            const { w, h, heightFactor, lean } = args;

            const trigH = heightFactor*w;

            const result = {
                nextRight: Math.sqrt(trigH**2 + (w * (.5+lean))**2),
                nextLeft: Math.sqrt(trigH**2 + (w * (.5-lean))**2),
                nextHeight: .8*h,
                A: Math.deg(Math.atan(trigH / ((.5-lean) * w))),
                B: Math.deg(Math.atan(trigH / ((.5+lean) * w)))
            };11

            memo[memoKey] = result;
            return result;
        }
    }
}();

const Pythagoras = ({ w, h, x, y, heightFactor, lean, left, right, lvl, maxlvl }) => {
  if (lvl > maxlvl || w < 1) {
      return null;
  }

  //旧版本的实现，没有记忆功能
  /*const trigH = heightFactor*w,
        nextRight = Math.sqrt(trigH**2 + (w*(.5+lean))**2),
        nextLeft = Math.sqrt(trigH**2 + (w*(.5-lean))**2),
        nextHeight = .8*h,
        A = Math.deg(Math.atan(trigH / (w*(.5-lean)))),
        B = Math.deg(Math.atan(trigH / (w*(.5+lean))));*/

  const { nextRight, nextLeft, nextHeight, A, B } = memoizedCalc({
      w: w,
      h: h,
      heightFactor: heightFactor,
      lean: lean
  });

  let rotate = '';

  if (left) {
      rotate = `rotate(${-A} 0 ${h})`;
  }else if (right) {
      rotate = `rotate(${B} ${w} ${h})`;
  }

  return (
      <g transform={`translate(${x} ${y}) ${rotate}`}>
          <rect width={w} height={h}
                x={0} y={0}
                style={{fill: interpolateViridis(lvl/maxlvl)}} />

           <Pythagoras w={nextLeft} h={nextHeight}
                         x={0} y={-nextHeight}
                         lvl={lvl+1} maxlvl={maxlvl}
                         heightFactor={heightFactor}
                         lean={lean}
                         left />

            <Pythagoras w={nextRight} h={nextHeight}
                        x={w-nextRight} y={-nextHeight}
                        lvl={lvl+1} maxlvl={maxlvl}
                        heightFactor={heightFactor}
                        lean={lean}
                        right />
      </g>
  );
};


export default Pythagoras;

















