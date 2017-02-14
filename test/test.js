var mocha = require('mocha');
var chai = require('chai');
var assert = chai.assert;
var expect = chai.expect;
var should = chai.should;

var Apis = require('../js/apis/create-monster');
var monsterReducer = require('../js/reducers/index');

var joelvl1Monst = Apis.create('Joe', 1);

describe('test', function(){
	it('joe monster lvl and name: Joe, 1', function(){
		assert.equal(joelvl1Monst.name, 'Joe', 'joelvl1Monst.name == Joe');
		assert.equal(joelvl1Monst.charClass.level, 1, 'joelvl1Monst.level == 1');
	});
	
});