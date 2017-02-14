import React, { Component } from 'react';
import { Link } from 'react-router';

export default class MonsterListItem extends Component {
	constructor(){
		super();
	}
	render() {
		var LinkName = "/monsterFull/" + this.props.name;
		return (
			<ul className="share30 listMainDisplay">
					<li><Link to={LinkName}>
				{this.props.name} </Link></li>
					<li>Lvl: {this.props.level}</li>
					<li>Hp: {this.props.hp}</li>
					<li>AC: {this.props.ac}</li>
					<li>Character: { this.props.type }</li>
				
			</ul>
		);
	}
}