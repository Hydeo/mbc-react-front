import { firebase, db } from "../firebase";
import { auth_user,sign_out_user } from "./user_actions";

//Before each request, we ask firebase if the user's token currently loged in (if there is one) is still correct
//if it is not we log him off
export const check_token_before_query = callback => {
    return dispatch => {
      return firebase.auth.onAuthStateChanged(user => {
        if (user) {
          dispatch(auth_user(user));
          user.getIdToken().then(token => callback(token, dispatch));
        } else {
          dispatch(sign_out_user());
        }
      });
    };
  };