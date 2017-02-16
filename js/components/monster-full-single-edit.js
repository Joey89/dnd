import React, { Component } from 'react';
import { Link } from 'react-router';
import htmlspecialchars from 'htmlspecialchars';

export default class MonsterFullSingle extends Component {
	componentWillMount(){
	}
	render() {
		var monster = '';
		for(var key in this.props.monster.value){
			monster = this.props.monster.value[key]
			var mLevel = htmlspecialchars(monster.charClass.level);
			var mType = htmlspecialchars(monster.charClass.type);
			var mHp =htmlspecialchars( monster.hp);
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
			
			var mLoot = htmlspecialchars(monster.charClass.loot);
			var mAc = htmlspecialchars(monster.charClass.ac);
			var mFF = htmlspecialchars(monster.charClass.flatFooted);
			var mTouch = htmlspecialchars(monster.charClass.touch);

			var mFort = htmlspecialchars(monster.charClass.fortitude);
			var mReflex = htmlspecialchars(monster.charClass.reflex);
			var mWill = htmlspecialchars(monster.charClass.will);
			var mImg =htmlspecialchars(monster.charClass.img);

		}
		console.log(monster);
		var backLink = "/MonsterFull/"+ htmlspecialchars(monster.name);
		var imgString = '';
		if(typeof mImg == 'string'){
			//reg ex to match after _ for folder
			var img_matcher = /^[^\_]*/g;
			var img_folder = mImg.match(img_matcher);
			imgString = "../images/monsters/" + img_folder +"/"+ mImg + ".jpg";

			console.log('IMG Folder: ' + imgString);
		}
		return (
			<div className="pretty-inputs">
				<Link to={backLink} className="back-btn">Back</Link>
				<span className="align-right">
					<a href="/" className="back-btn">Home</a>
				</span>
				<form action="" method="POST">
					<h1 className="statsTitle stats-main-title">Editing Character:{htmlspecialchars(monster.name)}</h1>
					<div className="char_img_display">
						<img src={imgString}/>
					</div>
					<div className="caveatFont statsContainerInput">
						
						<input type="hidden" name="name" key={htmlspecialchars(monster.name)} value={htmlspecialchars(monster.name)}/>
						<input type="hidden" name="img" key={mImg} value={mImg}/>
						<input type="hidden" name="loot" key={mLoot} value={mLoot}/>
						<h4 className="longer-pretty-inputs">
							<span className="share50">
							Level: <input type="text" name="level" key={mLevel} defaultValue={mLevel}/>
							</span>
							<span className="share50">
							Type: <input type="text" name="type" key={mType} defaultValue={mType}/>
							</span>
						</h4>
						<div className="">
							<ul className="share30right">
								<li>HP: <input type="text" name="hp" key={mHp} defaultValue={mHp}/></li>
								<li>Init: <input type="text" name="Init" key={mInit} defaultValue={mInit}/></li>
								<li>Range: <input type="text" name="range" key={mRange} defaultValue={mRange}/></li>
								<li>Speed: <input type="text" name="speed" key={mSpeed} defaultValue={mSpeed}/></li>
								<li>XP: <input type="text" name="xp" key={mXp} defaultValue={mXp}/></li>
								<li>Attack Bonus: <input type="text" name="atkBonus" key={mAtkBonus} defaultValue={mAtkBonus}/></li>
								<li>Attacks: <input type="text" name="attacks" key={mAttacks1} defaultValue={mAttacks1}/></li>
								<li>Spells: <input type="text" name="spells" key={mSpells1} defaultValue={mSpells1}/></li>
							</ul>

							<ul className="share30right">
								<li>AC: <input type="text" name="ac" key={mAc} defaultValue={mAc}/></li>
								<li>Flat Footed: <input type="text" name="flatFooted" key={mFF} defaultValue={mFF}/></li>
								<li>Touch: <input type="text" name="touch" key={mTouch} defaultValue={mTouch}/></li>
							</ul>

							<ul className="share30right">
								<li>Fortitude: <input type="text" name="fortitude" key={mFort} defaultValue={mFort} /></li>
								<li>Reflex: <input type="text" name="reflex" key={mReflex} defaultValue={mReflex} /></li>
								<li>Will: <input type="text" name="will" key={mWill} defaultValue={mWill}  /></li>
							</ul>
							<div className="clearfix"></div>

							
						</div>
					</div>
					<div>
						<input type="submit"defaultValue="Save Changes" className="back-btn"/>
					</div>
				</form>
			</div>
		);
	}
}