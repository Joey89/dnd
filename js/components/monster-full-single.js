import React, { Component } from 'react';
import { Link } from 'react-router';

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
			monster = this.props.monster.value[key]
			var mLevel = monster.charClass.level;
			var mType = monster.charClass.type
			var mHp = monster.hp;
			var mInit = monster.charClass.init;
			var mRange =  monster.charClass.range;
			var mSpeed =  monster.charClass.speed;
			var mAtkBonus = monster.charClass.atkBonus;
			var mXp = monster.charClass.xp;
			if(monster.charClass.attacks){
				var mAttacks1 = monster.charClass.attacks.join(', ');
			}else{
				var mAttacks1 = 'None';
			}
			if(monster.charClass.spells){
				var mSpells1 = monster.charClass.spells.join(', ');

			}else{
				var mSpells1 = 'None';
			}
			

			var mAc = monster.charClass.ac;
			var mFF = monster.charClass.flatFooted;
			var mTouch = monster.charClass.touch;

			var mFort = monster.charClass.fortitude;
			var mReflex = monster.charClass.reflex;
			var mWill = monster.charClass.will;

			var mLoot = monster.charClass.loot;
			var mImg = monster.charClass.img;

		}
		var monsterEditLink = "/MonsterEdit/"+monster.name;
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
					<h1 className="statsTitle stats-main-title">Character: {monster.name}</h1>
					<div className="char_img_display" ref="char_img_display" onClick={this.toggleImageSize.bind(this)}>
						<img src={imgString}/>
					</div>
					<div className="clearfix"></div>
					<span className="share50">
						<a href="#0" className="delete-btn" onClick={this.props.handleCharDelete.bind(this, monster.name)}>Delete Character</a>
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