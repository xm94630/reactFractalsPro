import React,{Component} from 'react';
import logo from './star.svg';
import Pythagoras from './Pythagoras';
import {select as d3select, mouse as d3mouse} from 'd3-selection';
import {scaleLinear} from 'd3-scale';
import './App.css';

/*这个版本是彩色的，带点动画的*/
class App extends Component {
    svg = {
        width:1280,
        height:600
    }
    state = {
        currentMax: 0,   //用作动画用的。每次增加一个层级，就增1
        baseHeight:2,    //初始的方块的高度
        heightFactor:0,  //这个其实就是高度的比例因子，他是相对于宽度而言。比如宽为100，heightFactor为0.5，那么那么三角形的高度就是100。
                         //这个也是睡着鼠标的y坐标而改变的。
                         //不过我奇怪的是，为0的时候，高度应该是没有的，在初始显示的时候，还是有一点点的高度的，这是为什么呢？
        lean:0           //我称之为“偏量”，节点的正方形上边的一个点，在边长(假设为1)范围中移动的范围是[0-1]，那么中心点就是0.5
                         //鼠标在左半个屏幕中移动的时候，正好对应[0-0.5]
                         //这里用用法更加巧妙，以中心0.5作为起始点，左右偏移量就是这个lean。
    };

    //注意，这个才是设置递归深度的。
    //currentMax，这是用用在动画上的，就第一次渲染的时候，渲染第一个层级，第二次渲染第二层级...
    realMax = 10;

    componentDidMount() {

        //js传统的事件绑定的方法。
        this.refs.svg.addEventListener('click',function(){
            console.log('点击svg');
        })

        //这个是使用 d3select 包装元素之后，使用的事件方法， d3select 的作用和 jquery 是一样的。
        d3select(this.refs.svg).on("mousemove", this.onMouseMove.bind(this));

        this.next();
    }

    next() {
        const { currentMax } = this.state;

        if (currentMax < this.realMax) {
            this.setState({currentMax: currentMax + 1}); //最后 currentMax 会达到 realMax 的值
            setTimeout(this.next.bind(this), 500);
        }
    }

    onMouseMove(event){
        const [x,y] = d3mouse(this.refs.svg);

        //这是个比例尺，后面用这个比例，来处理y的变化来改变方块的高度。
        const scaleY = scaleLinear().domain([this.svg.height,this.svg.height/2])
                                    .range([2,100]);

        //比例尺
        const scaleFactor = scaleLinear().domain([this.svg.height,0])
                                         .range([0,.8]);

        //比例尺
        const scaleLean = scaleLinear().domain([0,this.svg.width/2,this.svg.width])
                                       .range([.5,0,-.5]);

        this.setState({
            baseHeight: scaleY(y),
            heightFactor:scaleFactor(y),
            lean:scaleLean(x)
        });

    }

    render() {
        return (
            <div className="App">
                <div className="App-header">
                    <img src={logo} className="App-logo" alt="logo" />
                    <h2>This is a Pythagoras tree</h2>
                </div>
                <p className="App-intro">
                    <svg width={this.svg.width} height={this.svg.height} ref="svg">

                        <Pythagoras w={80}
                                    h={this.state.baseHeight}
                                    heightFactor={this.state.heightFactor}
                                    lean={this.state.lean}
                                    x={this.svg.width/2-40}
                                    y={this.svg.height-this.state.baseHeight}
                                    lvl={0}
                                    maxlvl={this.state.currentMax}/>

                    </svg>
                </p>
            </div>
        );
    }
}

export default App;
