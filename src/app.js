import React,{Component} from 'react';
import logo from './star.svg';
import Pythagoras from './Pythagoras';
import {select as d3select, mouse as d3mouse} from 'd3-selection';
import './App.css';

/*这个版本是彩色的，带点动画的*/
class App extends Component {
    svg = {
        width:1280,
        height:600
    }
    state = {
        currentMax: 0,
        baseHeight:2,
        heightFactor:0,
        lean:0
    };

    realMax = 10;

    componentDidMount() {
        d3select(this.refs.svg).on("mousemove",function(){
            console.log('鼠标move')
        })
        console.log(this)
        this.next();
    }

    next() {
        const { currentMax } = this.state;

        if (currentMax < this.realMax) {
            this.setState({currentMax: currentMax + 1});
            setTimeout(this.next.bind(this), 500);
        }
    }

    render() {
        return (
            <div className="App">
                <div className="App-header">
                    <img src={logo} className="App-logo" alt="logo" />
                    <h2>This is a Pythagoras tree</h2>
                </div>
                <p className="App-intro">
                    <svg width="640" height="480" ref="svg">

                        <Pythagoras w={80}
                                    h={20}
                                    x={320-50}
                                    y={480-100}
                                    lvl={0}
                                    maxlvl={this.state.currentMax}/>

                    </svg>
                </p>
            </div>
        );
    }
}

export default App;
