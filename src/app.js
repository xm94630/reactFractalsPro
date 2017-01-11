import React,{Component} from 'react';
import logo from './star.svg';
import Pythagoras from './Pythagoras';
import './App.css';

//这个版本是黑白静态的分形树
class App extends Component{
	render(){
		return (
			<div className="App">
				<div className="App-header">
					<img src={logo} className="App-logo" alt="logo"/>
					<h2>xm94630</h2>
				</div>
				<p className="App-intro">
					<svg width="640" height="480">
						<Pythagoras ang={45}
						            w={100}
						            x={320-50}
						            y={480-100}
						            lvl={0} />
					</svg>
				</p>
			</div>
		)
	}
}

export default App;


/*这个版本是彩色的，带点动画的*/
/*class App extends Component {
    state = {
        currentMax: 0,
    };

    realMax = 13;

    componentDidMount() {
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
                    <svg width="640" height="480">

                        <Pythagoras w={100}
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

export default App;*/
