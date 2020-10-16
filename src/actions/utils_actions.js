import { firebase, db } from "../firebase";
import { authUser,signOutUser } from "./user_actions";

export const UPDATE_LANG = "UPDATE_LANG";

//Before each request, we ask firebase if the user's token currently loged in (if there is one) is still correct
//if it is not we log him off
export const validateFirebaseToken = callback => {
    return dispatch => {
      return firebase.auth.onAuthStateChanged(user => {
        if (user) {
          dispatch(authUser(user));

          user.getIdToken()
          .then(token => callback(token, dispatch));

        } else {
          dispatch(signOutUser());
        }
      });
    };
  };

export const updateCurLang = (lang) =>{
  return dispatch => {
    dispatch({
      type: UPDATE_LANG,
      payload : lang
    });
  };
}

export const loadingRequestStart = (request_name) =>{
    return dispatch => {
     dispatch(
      {
        type: request_name+'_REQUEST'
      })
    }
}

export const loadingRequestSuccess = (request_name) =>{
    return dispatch => {
     dispatch(
      {
        type: request_name+'_SUCCESS'
      })
    }
}

export const loadingRequestFailure = (request_name,error) =>{
    return dispatch => {
     dispatch(
      {
        type: request_name+'_FAILURE',
        payload : error
      })
    }
}