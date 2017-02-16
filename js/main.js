import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import store from './store/store';
import { Router, Route, browserHistory } from 'react-router';

import MonstersList from './containers/MonstersList';
import MonsterFull from './containers/monsterFull';
import MonstersEdit from './containers/MonstersEdit';

class App extends Component {
	constructor(){
		super();
		this.state = {levelValue: 0, errorMsg: ''}
	}

	setLevel(e){
		var val = e.target.value;
		if(isNaN(val)){
			this.refs.error_msg.style = 'display: block';
			this.refs.error_msg.innerHTML = 'ERROR: Must Enter a Valid Number';
		}else{
			this.refs.error_msg.style = 'display: none';
			this.refs.error_msg.innerHTML = '';
		}
		this.setState({
			levelValue: val
		});
	}

	render() {
		return (
			<div>
				<div className="home_header_img">
					<h2 className="statsTitle" style={{margin: '50px'}}>D&D 3.5 Monster Create app</h2>
					<div>
						<span className="share50">
						Filter Monsters by Level:
						<input type="text" onChange={this.setLevel.bind(this)}/>
						</span>
						<span className="share50">
							<a href='/addMonster' className="edit-btn">Add New Monster</a>
						</span>
					</div>
				</div>
				<div className="clearfix"></div>
				<span className="error_msg" ref="error_msg"></span>
				<MonstersList store={this.props.store} levelValue={this.state.levelValue}/>

			</div>
		);
	}
}

var app = document.getElementById('monsters_app');

ReactDOM.render(
	<Provider store={store}>
		<Router history={browserHistory}>
			<Route path="/" component={App}></Route>
			<Route path="/MonsterFull/:name" component={MonsterFull}/>
			<Route path="/MonsterEdit/:name" component={MonstersEdit}/>
		</Router>
	</Provider>,
	app
);
