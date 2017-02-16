var express = require('express');
var router = express.Router();
var csrf = require('csurf');
var bodyParser = require('body-parser');
//schemas
var MonsterSchema = require('../schemas/monster');
var MonsterCreator = require('../js/apis/create-monster');

var conn = require('../db');

// setup route middlewares
var csrfProtection = csrf({ cookie: true })
var parseForm = bodyParser.urlencoded({ extended: false });
var mongoose = require('mongoose');
mongoose.Promise = global.Promise;


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'D&D 3.5 Monster Create' });
});


//Post monster info
router.get('/addMonster', csrfProtection, function(req, res) {
	// pass the csrfToken to the view
  res.render('addMonster', { title: 'Create Monster ( d&d 3.5 )' , csrfToken : req.csrfToken()});
});


router.post('/addMonster', parseForm, csrfProtection, function(req, res) {
  //import randomizing JS files for monster
  
  if (req.body.name && req.body.level ) {
  	//check if name exists and exit
  	//Needs done
  	MonsterSchema.find({name: req.body.name}).exec(function (err, docs) {
  		if(err){
  			console.log(err);
  			res.send(err);
  			return;
  		}
       	if (docs.length){
           res.send('Error Creating Because Name is Taken')
        }else{
        	var monst = MonsterCreator.create(req.body.name, req.body.level, req.body.charType);
		  	//Save monster to mongo db here then redirect? maybe to monster created page
		  	var record = new MonsterSchema(monst);
				record.save(function(err){
					if(err){
						res.status(500).json({status: 'failure'});
						return;
					}else{
						res.end('success');
						return;
					}
			});
			//send flash success msg
			res.redirect('./');
        }
    });
 
  } else {
  	//Send flash err msg;
  	res.send('Error! You Must fill out both fields');
  }

  //res.redirect('./');

});
//get monster info
router.get('/getMonsters', function(req, res, next) {
 	/*var query = MonsterSchema.find(function(err, monster){
 		if(err){
 			res.send('error' + err);
 		}
 		res.json(monster);
 	});*/

 	MonsterSchema.find().exec(function(err, monster){
 		if(err){
 			res.send('error' + err);
 		}
 		res.json(monster);
 	});
 	/*query.exec().then(
 		function(foundMonsters){
 			res.render('/', {
 				state: JSON.stringify(foundMonsters)
 			});
 		}
 	);*/
});

router.get('/monsterFull/:name', function(req, res, next) {
	var name = req.params.name;
	MonsterSchema.find({name: name}).exec(function(err, monster){
 		if(err){
 			res.send('error' + err);
 		}
 		res.json(monster);
 	});

});


router.delete('/monsterFull/:name', function(req, res, next) {
	var name = req.params.name;
	MonsterSchema.remove({name: name}, (err)=>{
 		if(err){
 			res.send('error' + err);
 		}
 		//Not Redirecting
 		return;
 	});
	req.method = 'GET'
 	res.redirect('./');

});

router.post('/MonsterEdit/:name', function(req, res, next) {
	//Update The Monster in DB
	//Redirect
	console.log(req.body);
	var monst = req.body;

	//put body into monsterObj for schema
	var monsterObj = {
		name: monst.name,
		attacks: monst.attacks.split(', '),//need to put back into array
		charClass: {
			loot: monst.loot,
			attacks: monst.attacks.split(', '), //back to array
			reflex: monst.reflex,
			will: monst.will,
			fortitude: monst.fortitude,
			touch: monst.touch,
			flatFooted: monst.flatFooted,
			ac: monst.ac,
			range: monst.range,
			speed: monst.speed,
			init: monst.Init,//needed to change
			xp: monst.xp,
			atkBonus: monst.atkBonus,
			level: monst.level,
			type: monst.type,
		},
		hp: monst.hp ,
		spells: monst.spells.split(', ')
	};
	//console.log(monsterObj);

	//Monster Schema for update
	var record = new MonsterSchema(monsterObj);

	//update
	MonsterSchema.update({name: monst.name}, monsterObj, {upsert: false}, function(err, num, n){
	    if(!err){
	    	res.redirect('../');
	    }
	});
	//res.redirect('../');
});

module.exports = router;