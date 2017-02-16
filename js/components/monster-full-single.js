import React, { Component } from 'react';
import { Link } from 'react-router';
import htmlspecialchars from 'htmlspecialchars';

export default class MonsterFullSingle extends Component {
	constructor(){
		super();
		this.state = { toggle: true };
	}
	toggleImageSize(){
		console.log('heya');
		var toggle = this.state.toggle;
		if(this.state.toggle){
			this.refs.char_img_display.className =  "char_img_display_clicked";
			this.setState({
				toggle: !toggle
			});
		}else{
			this.refs.char_img_display.className =  "char_img_display";
			this.setState({
				toggle: !toggle
			});
		}
		//e.target.className = "char_img_display_clicked";
	}
	render() {
		var monster = '';
		for(var key in this.props.monster.value){
			monster = this.props.monster.value[key];
			var mLevel = htmlspecialchars(monster.charClass.level);
			var mType = htmlspecialchars(monster.charClass.type);
			var mHp = htmlspecialchars(monster.hp);
			var mInit = htmlspecialchars(monster.charClass.init);
			var mRange =  htmlspecialchars(monster.charClass.range);
			var mSpeed =  htmlspecialchars(monster.charClass.speed);
			var mAtkBonus = htmlspecialchars(monster.charClass.atkBonus);
			var mXp = htmlspecialchars(monster.charClass.xp);
			if(monster.charClass.attacks){
				var mAttacks1 = htmlspecialchars(monster.charClass.attacks.join(', '));
			}else{
				var mAttacks1 = 'None';
			}
			if(monster.charClass.spells){
				var mSpells1 = htmlspecialchars(monster.charClass.spells.join(', '));

			}else{
				var mSpells1 = 'None';
			}
			

			var mAc = htmlspecialchars(monster.charClass.ac);
			var mFF = htmlspecialchars(monster.charClass.flatFooted);
			var mTouch = htmlspecialchars(monster.charClass.touch);

			var mFort = htmlspecialchars(monster.charClass.fortitude);
			var mReflex = htmlspecialchars(monster.charClass.reflex);
			var mWill = htmlspecialchars(monster.charClass.will);

			var mLoot = htmlspecialchars(monster.charClass.loot);
			var mImg =htmlspecialchars( monster.charClass.img);

		}
		var monsterEditLink = "/MonsterEdit/"+ htmlspecialchars(monster.name);
		var imgString = '';
		if(typeof mImg == 'string'){
			//reg ex to match after _ for folder
			var img_matcher = /^[^\_]*/g;
			var img_folder = mImg.match(img_matcher);
			imgString = "../images/monsters/" + img_folder +"/"+ mImg + ".jpg";

			console.log('IMG Folder: ' + imgString);
		}
		return (
			<div>
				<div>
					<a href="../" className="back-btn">Back</a>
					<span className="align-right">
					<a href="/" className="back-btn">Home</a>
				</span>
					<h1 className="statsTitle stats-main-title">Character: {htmlspecialchars(monster.name)}</h1>
					<div className="char_img_display" ref="char_img_display" onClick={this.toggleImageSize.bind(this)}>
						<img src={imgString}/>
					</div>
					<div className="clearfix"></div>
					<span className="share50">
						<a href="#0" className="delete-btn" onClick={this.props.handleCharDelete.bind(this, htmlspecialchars(monster.name))}>Delete Character</a>
					</span>
					<span className="share50">
						<Link className="edit-btn" to={monsterEditLink}>Edit Character</Link>
					</span>
					<div className="clearfix"></div>
					<div className="statsContainerChar caveatFont">
						<h4 className="single-char-state-level-type statsTitle">
							<span className="share50">
							Level: {mLevel}
							</span>
							<span className="share50">
							Type: {mType}
							</span>
						</h4>
						<ul className="share30">
							<li>HP: {mHp}</li>
							<li>Init: {mInit}</li>
							<li>Range: {mRange}</li>
							<li>Speed: {mSpeed}</li>
							<li>XP: {mXp}</li>
							<li>Attack Bonus: {mAtkBonus}</li>
							<li>Attacks: {mAttacks1}</li>
							<li>Spells: {mSpells1}</li>

						</ul>

						<ul className="share30">
							<li>AC: {mAc}</li>
							<li>Flat Footed: {mFF}</li>
							<li>Touch: {mTouch}</li>
						</ul>

						<ul className="share30">
							<li>Fortitude: {mFort}</li>
							<li>Reflex: {mReflex}</li>
							<li>Will: {mWill}</li>
						</ul>
						<div className="clearfix"></div>
						<div className="text-center"> Loot: {mLoot}</div>
					</div>
					
				</div>
			</div>
		);
	}
}