import React, { Component } from 'react';
import { Link } from 'react-router';

export default class MonsterListItem extends Component {
	constructor(){
		super();
	}
	render() {
		var LinkName = "/monsterFull/" + this.props.name;
		var imgString = '';
		var mImg = this.props.img;
		if(typeof mImg == 'string'){
			//reg ex to match after _ for folder
			var img_matcher = /^[^\_]*/g;
			var img_folder = mImg.match(img_matcher);
			imgString = "../images/monsters/" + img_folder +"/"+ mImg + ".jpg";

			console.log('IMG Folder: ' + imgString);
		}

		return (
			<ul className="share30 listMainDisplay">
					<li><Link to={LinkName}>
				{this.props.name} </Link></li>
				<li className="small_img_monster"><img src={imgString} /></li>
					<li>Lvl: {this.props.level}</li>
					<li>Hp: {this.props.hp}</li>
					<li>AC: {this.props.ac}</li>
					<li>Character: { this.props.type }</li>
					
			</ul>
		);
	}
}