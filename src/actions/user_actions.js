import axios from "axios";

import { conf_dev } from "../config";
import { firebase, db} from "../firebase";
import {
  doCreateUserWithEmailAndPassword,
  doSignInWithEmailAndPassword,
  doSignInWithGoogleAuthProvider,
  doSignInWithFacebookAuthProvider,
  doSignOut
} from "../firebase/auth";
import {
  getGameBrowserInitData
} from './game_browser_actions'
import{
  getUserGameCollection
} from './game_collection_actions'

export const AUTH_USER = "AUTH_USER";
export const AUTH_ERROR = "AUTH_ERROR";
export const SIGN_OUT_USER = "SIGN_OUT_USER";
export const COPY_SIGN_UP = "COPY_SIGN_UP";

export const URL_API = conf_dev.url_api;



export const signUpUser = credentials => {
  return dispatch => {
    return doCreateUserWithEmailAndPassword(
      credentials.email,
      credentials.password
    )
      .then(response => {
        dispatch(authUser());
      })
      .catch(error => {
        dispatch(authError({"type" : "sign_up_error", "error" : error }));
      });
  };
};

export const signUpCopyPrivateDb = user =>{
  const data = {
    uid: user.uid,
    identifier : user.identifier
  };
  return dispatch =>{
    return axios.post(URL_API+"/signUp",data)
			.then(
				(request)=>{
					dispatch({
						type : COPY_SIGN_UP,
						payload : request
					});
				}
			) 
  }
}

export const signInUser = credentials => {
  return dispatch => {
    return doSignInWithEmailAndPassword(credentials.email, credentials.password)
      .then(response => {
        dispatch(authUser(response.user));
      })
      .catch(error => {
        dispatch(authError({"type" : "sign_in_error",  "error" : error}));
      });
  };
};

export const signInUserGoogle = ()=>{
  return dispatch=>{
    return doSignInWithGoogleAuthProvider()
      .then(response=>{
        if(response.additionalUserInfo.isNewUser){
          dispatch(signUpCopyPrivateDb({"uid" : response.user.uid, "identifier" : response.user.email}))
        }
      })
  }
}

export const signInUserFacebook = ()=>{
  return dispatch=>{
    return doSignInWithFacebookAuthProvider()
      .then(response=>{
        if(response.additionalUserInfo.isNewUser){
          dispatch(signUpCopyPrivateDb({"uid" : response.user.uid, "identifier" : response.user.email}))
        }
      })
  }
}

export const authUser = (user) => {
  return dispatch => {
    dispatch({
      type: AUTH_USER,
      payload : user
    });
  };
};

export const authError = error => {
  return dispatch => {
    dispatch({
      type: AUTH_ERROR,
      payload: error
    });
  };
};

export const signOutUser = () =>{
	return dispatch => {
		return firebase.auth.signOut()
		.then(() => {
			dispatch({
				type: SIGN_OUT_USER
			});
		})
		.catch(error =>{
			console.log(error);
		})
	}
}

export const validateAuth = () => {
  return dispatch => {
    firebase.auth.onAuthStateChanged(user => {
      if (user) {
        dispatch(authUser(user));
      } else {
        dispatch(signOutUser());
      }
    });
  };
};


export const userAuthInit = () => {
  return dispatch => {
    firebase.auth.onAuthStateChanged(user => {
      if (user) {
        return dispatch(()=>{
          dispatch(authUser(user));
          dispatch(getGameBrowserInitData());
          dispatch(getUserGameCollection());
        });
        
      } else {
        return dispatch(signOutUser());
      }
    });
  };
}