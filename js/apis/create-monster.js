
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
Also will add a random character variable, to switch between classes in certain hp tiers


New Layout
	CHECK HP TOTALS BEFORE RE DOING
	hp > 8 : Tank < Barb, Paladin, Fighter
	hp > 6 : Melee DPS < Barb, Fighter, Monk, Bard
	hp > 4 : Ranged DPS < Ranger, Sorc, Wizard
	
	if > 6 && token= Dru_Cleric
	//IDK YET DRUID, CLERIC
	//Healers Basic Attacks With heals ( best for group fights )

*/
//Create Monster for us to send back to the server
//.For Tpyes maybe add mor and ranodm more. with creatures that fit that type
//Ranger, Mage, 
var monsterCreator = (function(){
	var monsterObj = {};
	var monsterImagesTank = ['bugbear_tank', 'dwarf_tank', 'elf_tank', 'orc_tank', 'human_tank' ];
	var monsterImagesFighter = ['bugbear_fighter', 'dwarf_fighter', 'elf_fighter', 'orc_fighter', 'human_fighter' ];
	var monsterImagesArcher = ['bugbear_archer', 'dwarf_archer', 'elf_archer', 'orc_archer', 'human_archer' ];
	var monsterImagesCaster1 = ['bugbear_caster1', 'dwarf_caster1', 'elf_caster1', 'orc_caster1', 'human_caster1' ];
	var classToken = 'NOT_DRU_CLERIC';
	//Add these empty methods next
	function getClass(){

	}
	function getAttacks(theClass, level){

	}
	function getSpells(theClass, level){

	}
	function getImage(theClass){
		var monsterArrays = [monsterImagesTank, monsterImagesFighter, monsterImagesArcher, monsterImagesCaster1 ];
		var rando = Math.floor(Math.random() * monsterArrays.length);

		switch(theClass){
			case 'Tank':
				var rando = Math.floor(Math.random() * monsterArrays[0].length);
				return monsterArrays[0][rando];
				return ;
			case 'Fighter':
				var rando = Math.floor(Math.random() * monsterArrays[1].length);
				return monsterArrays[1][rando];
				return;
			case 'Archer':
				var rando = Math.floor(Math.random() * monsterArrays[2].length);
				return monsterArrays[2][rando];
				return;
			case 'Mage':
				var rando = Math.floor(Math.random() * monsterArrays[3].length);
				return monsterArrays[3][rando];
			default:
				return;
		};
	}

	function getHP(level){
		return level * (Math.floor(Math.random() * 10) + 4);
	}
	function getRanLoot(level, hp){
		var ranLooter = Math.floor(Math.random() * 10);
		var ranLoot = 'None';
		var gold = level * Math.floor(Math.random() * hp);
		var loots = ['axe', 'sword', 'bow', 'staff', 'spear', 'heavy armor','light armor','medium armor', 'shield'];
		var lootPick = Math.floor(Math.random() * loots.length);
		

		if(ranLooter > 8){
			ranLoot =  loots[lootPick] + ' / ' + gold + ' gold each';
		}else if(ranLooter > 5 && ranLooter <=8){
			ranLoot =  loots[lootPick];
		}else if(ranLooter > 3 && ranLooter <=5){
			ranLoot = gold + ' gold each';
		}else{
			ranLoot = 'None';
		}
		return ranLoot;
	}


	//SETUP THE CHARCLASS PROPERTY TO BE RETURNED
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
			charClass = createTank(level, hp);
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
			charClass = createFighter(level, hp);
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
			//Ranger, Mage
			var rando = Math.floor(Math.random() * 2);
			charClass = createMage(level, hp);
			if(rando!=0){
				//type archer
				charClass = createArcher(level, hp);
			}
		}

		return charClass;
	}
	function createTank(level, hp){
		var charClass = {};
		var level = Number(level);
		var levelAtk = 4 + level;
		var die = '1d';
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
			fortitude: Math.floor(Math.random() * 5) + 1 + Math.floor(level/2),////
			will: Math.floor(Math.random() * 3) + 1 + Math.floor(level/2),///
			reflex: Math.floor(Math.random() * 2) + 1 + Math.floor(level/2),//
			attacks: [die + attack],
			loot: getRanLoot(level, hp),
			img: getImage('Tank')
		};
		return charClass;
	}
	function createFighter(level, hp){
		var charClass = {};
		var level = Number(level);
		var levelAtk = 4 + level;
		var die = '1d';

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
			loot: getRanLoot(level, hp),
			img: getImage('Fighter')
		};
		return charClass;
	}
	function createMage(level, hp){
		var charClass = {};
		var level = Number(level);
		var levelAtk = 4 + level;
		var die = '1d';

		var attack = Math.floor( Math.random() * 4) + levelAtk;
		var ac = 10 + Number(level) + Math.floor(Math.random() * 2 );
			if(attack %2!==0){
				//uneven
				attack = (attack-1) + ' + ' +1;
			}else if(attack%3==0){
				attack = attack;
				die = '2d';
			}
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
				loot: getRanLoot(level, hp),
				img: getImage('Mage')
			};
			return charClass;
	}

	function createArcher(level, hp){
		var charClass = {};
		var level = Number(level);
		var levelAtk = 4 + level;
		var die = '1d';

		var attack = Math.floor( Math.random() * 4) + levelAtk;
		var ac = 10 + Number(level) + Math.floor(Math.random() * 2 );
			if(attack %2!==0){
				//uneven
				attack = (attack-1) + ' + ' +1;
			}else if(attack%3==0){
				attack = attack;
				die = '2d';
			}
			charClass = {
				type: 'Archer',
				level: level,
				atkBonus: Math.floor(Math.random() * (level*2) ) + 0,
				spells: ['spells!'],
				xp: (hp) * (Math.floor(Math.random() * 5) + 5),
				init: Math.floor(Math.random() * (level * 2)) + 2,
				speed: 6,
				range: 60,
				ac: ac,
				flatFooted: ac - Math.floor(Math.random() * 4),
				touch: ac - Math.floor(Math.random() * 4),
				fortitude: Math.floor(Math.random() * 2) + 1 + Math.floor(level/2),//
				will: Math.floor(Math.random() * 5) + 1 + Math.floor(level/2),////
				reflex: Math.floor(Math.random() * 2) + 1 + Math.floor(level/2),//
				attacks: [die + attack],
				loot: getRanLoot(level, hp),
				img: getImage('Archer')
			};
			return charClass;
	}

	//Api to create the character --- ONLY PUBLIC
	function create(name, level, charType){
		var hp = getHP(level);
		var char = getCharClass(level, hp);
		switch(charType){
			case 'Tank':
				char = createTank(level, hp);
			case 'Fighter':
				char = createFighter(level, hp);
			case 'Mage':
				char = createMage(level, hp);
			case 'Archer':
				char = createArcher(level, hp);
			default:
				char = getCharClass(level, hp);
		}
		var charClass = char;
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