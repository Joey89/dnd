import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import htmlspecialchars from 'htmlspecialchars';
import * as actionCreators from '../actions/monster-actions';
import MonsterFullSingle from '../components/monster-full-single';

const mapPropsFromState = (state) => {
	return {store: state};
};

const mapReducerFromState = (dispatch) => {
	return { actions: bindActionCreators(actionCreators, dispatch) };
};

@connect(mapPropsFromState, mapReducerFromState)
export default class monsterFull extends Component {
	constructor(){
		super();
		this.state = { monster: '' };
	}
	handleCharDelete(mName){
		var t = confirm('Are you sure you wish to delete?');
		if(t){
			//Delete Char
			this.props.actions.deleteMonsterByName(htmlspecialchars(mName));
			window.location.href = '/';
		}
	}

	initFindMonsterByName(){
		var self=this;
		var monsterByName = this.props.actions.getMonsterByName(htmlspecialchars(this.props.routeParams.name));
		monsterByName.then(
			function(monsters){
				self.setState({
					monster: monsters
				});
			}
		);
	}

	componentWillMount(){
		this.initFindMonsterByName();
	}

	render() {
		return (
			<div className="single_container">
				<MonsterFullSingle monster={this.state.monster} handleCharDelete={this.handleCharDelete.bind(this)}/>
				<div className="clearfix"></div>
			</div>
		);
	}
}