import {
  SET_USER,
  USER_LIST,
  SET_USER_INSTANCE,
  AUTH_USER,
  AUTH_ERROR,
  SIGN_OUT_USER
} from "../actions/user_actions";

const initialState = {
  user_name: localStorage.getItem("user_name"),
  user_list: [],
  user_instance: null,
  authenticated: null,
  error_type: { sign_in_error: null, sign_up_error: null }
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_USER:
      return {
        ...state,
        user_name: action.payload
      };
      break;
    case USER_LIST:
      return {
        ...state,
        user_list: action.payload.data
      };
      break;

    /*case SET_USER_INSTANCE: 
			console.log("dispatch set_user_instance")
			console.log(action.payload)
			return {
				...state,
				user_instance : action.payload
			}
		break;*/

    case AUTH_USER:
      return {
        ...state,
        authenticated: true,
        error_type: { sign_in_error: null, sign_up_error: null }
      };
      break;

    case AUTH_ERROR:
	  var new_error_type = {...state.error_type};
	  console.log('-----');
	  console.log(new_error_type);
	  console.log(action.payload);
	  new_error_type[action.payload.type] = action.payload.error.message;
	  console.log(new_error_type);
	  console.log('-----');
      return {
        ...state,
        authenticated: false,
        error_type: new_error_type
      };
      break;

    case SIGN_OUT_USER:
      console.log("sign out reduc");
      return {
        ...state,
        authenticated: false,
        error_type : { sign_in_error: null, sign_up_error: null }
      };
      break;

    default:
      return state;
  }
};
