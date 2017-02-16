import React, { Component } from 'react';
import { Link } from 'react-router';
import htmlspecialchars from 'htmlspecialchars';

export default class MonsterListItem extends Component {
	constructor(){
		super();
	}
	render() {
		var LinkName = "/monsterFull/" + htmlspecialchars(this.props.name);
		var imgString = '';
		var mImg = htmlspecialchars(this.props.img);
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
				{htmlspecialchars(this.props.name)} </Link></li>
				<li className="small_img_monster"><img src={imgString} /></li>
					<li>Lvl: {htmlspecialchars(this.props.level)}</li>
					<li>Hp: {htmlspecialchars(this.props.hp)}</li>
					<li>AC: {htmlspecialchars(this.props.ac)}</li>
					<li>Character: { htmlspecialchars(this.props.type )}</li>
					
			</ul>
		);
	}
}