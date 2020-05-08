import {
  AUTH_USER,
  AUTH_ERROR,
  SIGN_OUT_USER,
  COPY_SIGN_UP
} from "../actions/user_actions";
import { firebase } from '../firebase';



const get_authentificated_user = () => {
  var user_authed = null;
  /*firebase.auth.onAuthStateChanged(authUser => {
    if(authUser){
      console.log('user is authed');
      user_authed = authUser
    }
    else{
      console.log('user is not authed');
      user_authed = null;
    }
  }).then((response)=>{
    console.log('returned');
    console.log(response);
    console.log(user_authed);
    return user_authed;
  });*/

  
}

const initialState = {
  authenticated: null,
  user_authed : null,
  error_type: { sign_in_error: null, sign_up_error: null }
};



export default (state = initialState, action) => {
  switch (action.type) {
    case COPY_SIGN_UP:
      //TODO : Check if insertion is ok
      console.log('COPY_SIGN_UP_R');
      console.log(action.payload);
      return {
        ...state
      }
    break;
    
    case AUTH_USER:
      return {
        ...state,
        authenticated: true,
        user_authed : action.payload,
        error_type: { sign_in_error: null, sign_up_error: null }
      };
      break;

    case AUTH_ERROR:
	  var new_error_type = {...state.error_type};
	  new_error_type[action.payload.type] = action.payload.error.message;
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
        authenticated: null,
        user_authed : null,
        error_type : { sign_in_error: null, sign_up_error: null }
      };
      break;
    
    default:
      return state;
  }
};
