const reducerApp = (state=[], action) => {
	switch(action.type){
		case 'GET_MONSTERS':
			return [...state, action.payload];
			break;
		case 'GET_MONSTER_BY_NAME':
			return [...state, action.payload];
			break;
		case 'DELETE_MONSTER_BY_NAME':
			return [...state, action.payload];
			break;
		default:
			return state;
			break;
	}
}

export default reducerApp;