import { 
GET_LIST_LINKS,
ADD_LINK,
DELETE_LINK,
UPDATE_ISOTOPE,
SET_ISOTOPE
} from '../actions/isotope_actions';

const initialState = {
	test_action : 0,
	snapdragon : false,
	links : [],
	last_added_link : {}
}

export default (state = initialState, action ) =>{
	switch(action.type){
		
		case UPDATE_ISOTOPE:
			return state;
			break;

		case SET_ISOTOPE:
			return{
					...state,
					isotope_instance : action.payload
				}
			break;


		default:
			return state;
	}
}