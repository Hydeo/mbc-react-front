import { 
GET_LIST_LINKS,
ADD_LINK,
DELETE_LINK,
UPDATE_ISOTOPE,
SET_ISOTOPE
} from '../actions/basic_actions';

const initialState = {
	test_action : 0,
	snapdragon : false,
	links : [],
	last_added_link : {}
}

export default (state = initialState, action ) =>{
	switch(action.type){

		case GET_LIST_LINKS:
				return{
					...state,
					test_action : state.test_action +  1,
					snapdragon : !state.snapdragon,
					links : action.payload.data
				}
			break;

		case ADD_LINK:
			return{
					...state,
					links : [action.payload.data , ...state.links],
					last_added_link : action.payload.data 
				}
			break;
		case DELETE_LINK:

			var index =  state.links.findIndex(function(item) {
			    return item.id === action.idLink;
			});
			return{
				...state,
				links : [
							...state.links.slice(0,index),
							...state.links.slice(index+1)
						],
			}
			break;

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