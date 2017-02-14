export var getMonsters = (arg1) => {
	return{
		type: 'GET_MONSTERS',
		payload: fetch('/getMonsters').then(function(response) {
		  	return response.json();
		}).then(function(data) {
		 	return data;
		}).catch(function() {
		  console.log("Error with GET_MONSTERS!");
		})
	}
};

export const getMonsterByName = (name) => {
	var name = name;
	return{
		type: 'GET_MONSTER_BY_NAME',
		payload: fetch('/monsterFull/' + name).then(function(response) {
			console.log(name);
		  	return response.json();
		}).then(function(data) {
			return data;
		}).catch(function() {
		  	console.log("Error with getMonsterByName!");
		})
	}
};

export const deleteMonsterByName = (name) => {
	var name = name;
	return{
		type: 'DELETE_MONSTER_BY_NAME',
		payload: fetch('/monsterFull/' + name, {
			method: 'delete'
		}).then(function(response) {
			console.log(name);
		  	return response.json();
		}).then(function(data) {
			return data;
		}).catch(function() {
		  	console.log("Error with deleteMonsterByName!");
		})
	}
};

export const updateMonsterByName = (name) => {
	var name = name;
	return{
		type: 'ACTION_TYPE',
		payload: {}
	}
}
