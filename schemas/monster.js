var mongoose = require('mongoose');

module.exports = mongoose.model('Monsters', {
	name: String,
	attacks: Array,
	charClass: Object,
	hp: Number,
	spells: Array
	

});

/*
name: random gen
level: user selected - used for calculations

*/