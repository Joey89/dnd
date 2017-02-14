
/*
Monster Steps

after monster levl determined

get hp monsterlvl * Random() * 10

var classRandom = Radom * charClass.length
if hp > so much, buidl fighter / tank etc.

each build will have very own stats for
	( Each * by :LVL Still )
	atk, atkbonus, ac, ff, touch, fort, will, reflex, init, range, spells, maybe even feats
	Bosses Need LOOT! * lvl ofc
	roll = random ( 100 )
	if( > 80){
		gear + gold
	}
	if(> 60){
		gear
	}
	if(>40 double gold)
	if(> 20 gold)
	else nothng

*/
//Create Monster for us to send back to the server
//.For Tpyes maybe add mor and ranodm more. with creatures that fit that type
var monsterCreator = (function(){
	var monsterObj = {};

	function getHP(level){
		return level * (Math.floor(Math.random() * 10) + 4);
	}
	function getRanLoot(level, hp){
		var ranLooter = Math.floor(Math.random() * 10);
		var ranLoot = 'None';
		var gold = level * Math.floor(Math.random() * hp);
		var loots = ['axe', 'sword', 'bow', 'staff', 'spear', 'heavy armor','light armor','medium armor', 'shield'];
		var lootPick = Math.floor(Math.random() * loots.length);
		console.log('Router', ranLooter);
		if(ranLooter > 8){
			ranLoot = 'Gear ' + loots[lootPick] + ' / ' + gold + ' gold each';
		}else if(ranLooter > 5 && ranLooter <=8){
			ranLoot = 'Gear ' + loots[lootPick];
		}else if(ranLooter > 3 && ranLooter <=5){
			ranLoot = gold + ' gold each';
		}else{
			ranLoot = 'None';
		}
		return ranLoot;
	}
	function getCharClass(level, hp){
		var charClass = {};
		var level = Number(level);
		var levelAtk = 4 + level;
		var die = '1d';
		if((hp/level) >= 8) { 
			var attack = Math.floor( Math.random() * 4 ) + levelAtk;
			var ac = 10 +level + Math.floor(Math.random() * 8 );
			if(attack %2!==0){
				//uneven
				attack = (attack-1) + ' + ' +1;
			}else if(attack%3==0){
				attack = attack;
				die = '2d';
			}
			charClass = {
				type: 'Tank',
				level: level,
				atkBonus: Math.floor(Math.random() * (level*2) ) + 1 ,
				xp: (hp) * (Math.floor(Math.random() * 5) + 5),
				init: Math.floor(Math.random() * (level)) + 1,
				speed: 4,
				range: 1,
				ac: ac,
				flatFooted:  ac - Math.floor(Math.random() * 4),
				touch: ac - Math.floor(Math.random() * 4),
				fortitude: Math.floor(Math.random() * 5) + 1 +Math.floor(level/2),////
				will: Math.floor(Math.random() * 3) + 1 + Math.floor(level/2),///
				reflex: Math.floor(Math.random() * 2) + 1 + Math.floor(level/2),//
				attacks: [die + attack],
				loot: getRanLoot(level, hp)
			};
		}
		if((hp/level) >= 6 && (hp/level) < 8){
			var attack = Math.floor( Math.random() * 8) + levelAtk;
			var ac = 10 + level + Math.floor(Math.random() * 5 );
			if(attack %2!==0){
				//uneven
				attack = (attack-1) + ' + ' +1;
			}else if(attack%3==0){
				attack = attack;
				die = '2d';
			}
			charClass = {
				type: 'Fighter',
				level: level,
				atkBonus: Math.floor(Math.random() * (level*2) ) + 2,
				xp: (hp) * (Math.floor(Math.random() * 5) + 5),
				init: Math.floor(Math.random() * (level * 2)) + 2,
				speed: 6,
				range: 1,
				ac:  ac,
				flatFooted: ac - Math.floor(Math.random() * 4),
				touch: ac - Math.floor(Math.random() * 4),
				fortitude: Math.floor(Math.random() * 3) + 1 + Math.floor(level/2),///
				will: Math.floor(Math.random() * 2) + 1 + Math.floor(level/2),//
				reflex: Math.floor(Math.random() * 3) + 1 + Math.floor(level/2),///
				attacks: [die + attack],
				loot: getRanLoot(level, hp)
			};
		}
		if((hp/level) < 6){
			var attack = Math.floor( Math.random() * 4) + levelAtk;
			var ac = 10 + Number(level) + Math.floor(Math.random() * 2 );
			if(attack %2!==0){
				//uneven
				attack = (attack-1) + ' + ' +1;
			}else if(attack%3==0){
				attack = attack;
				die = '2d';
			}
			//ran num check for mage or wizard or archer
			charClass = {
				type: 'Mage',
				level: level,
				atkBonus: Math.floor(Math.random() * (level*2) ) + 0,
				spells: ['spells!'],
				xp: (hp) * (Math.floor(Math.random() * 5) + 5),
				init: Math.floor(Math.random() * (level * 2)) + 2,
				speed: 6,
				range: 1,
				ac: ac,
				flatFooted: ac - Math.floor(Math.random() * 4),
				touch: ac - Math.floor(Math.random() * 4),
				fortitude: Math.floor(Math.random() * 2) + 1 + Math.floor(level/2),//
				will: Math.floor(Math.random() * 5) + 1 + Math.floor(level/2),////
				reflex: Math.floor(Math.random() * 2) + 1 + Math.floor(level/2),//
				attacks: [die + attack],
				loot: getRanLoot(level, hp)
			};
		}

		return charClass;
	}

	function create(name, level){
		var hp = getHP(level);
		var charClass = getCharClass(level, hp);
		//getHP
		//get all stats basically
		monsterObj = {
			hp: hp,
			name: name,
			charClass: charClass
		}
		return monsterObj;
	}

	return{
		create: create
	}
})();

module.exports = monsterCreator;