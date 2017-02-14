import React, { Component } from 'react';
import MonsterListItem from '../components/monster-list-item';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as actionCreators from '../actions/monster-actions';

const mapPropsFromState = (state) => {
	return {store: state};
};

const mapReducerFromState = (dispatch) => {
	return { actions: bindActionCreators(actionCreators, dispatch) };
};

@connect(mapPropsFromState, mapReducerFromState)
export default class MonsterList extends Component {
	constructor(){
		super();
		this.state = { monsterList: { value: []}  };
	}
	initMonsters(){
		var t = this.props.actions.getMonsters();
		var self = this;
		t.then(
			function(t){
				self.setState({
					monsterList: t
				});
			}
		);
	}
	componentWillMount(){
		this.initMonsters();
	}
	render() {
		var filteredMonsters = this.state.monsterList.value.filter( (monster) => {
				if(this.props.levelValue==0){ return monster;}
				return monster.charClass.level == this.props.levelValue;
		});
		var theMonsterList = filteredMonsters.map( ( item, idx ) => {
			var mLvl = 0;
			var levelCheck = false;
			if (typeof item.charClass != 'undefined') {
				mLvl=item.charClass.level;
			} else {
				mLvl=0;
			}
			

			return(
				<MonsterListItem
					key={idx}
					name={item.name}
					level={mLvl}
					hp={item.hp}
					ac={item.charClass.ac}
					type={item.charClass.type}
				/>
			);	
		});
		
		return (
			<div className="listMainContainer">
				<h2 className="statsTitle">Monster List</h2>
				{theMonsterList}
				<div className="clearfix"/>
			</div>
		);
	}
}