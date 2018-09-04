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


export const AUTH_USER = "AUTH_USER";
export const AUTH_ERROR = "AUTH_ERROR";
export const SIGN_OUT_USER = "SIGN_OUT_USER";
export const COPY_SIGN_UP = "COPY_SIGN_UP";

export const URL_API = conf_dev.url_api;



export const sign_up_user = credentials => {
  return dispatch => {
    return doCreateUserWithEmailAndPassword(
      credentials.email,
      credentials.password
    )
      .then(response => {
        dispatch(auth_user());
      })
      .catch(error => {
        dispatch(auth_error({"type" : "sign_up_error", "error" : error }));
      });
  };
};

export const sign_up_copy_private_db = user =>{
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

export const sign_in_user = credentials => {
  return dispatch => {
    return doSignInWithEmailAndPassword(credentials.email, credentials.password)
      .then(response => {
        dispatch(auth_user(response.user));
      })
      .catch(error => {
        dispatch(auth_error({"type" : "sign_in_error",  "error" : error}));
      });
  };
};

export const sign_in_user_google = ()=>{
  return dispatch=>{
    return doSignInWithGoogleAuthProvider()
      .then(response=>{
        if(response.additionalUserInfo.isNewUser){
          dispatch(sign_up_copy_private_db({"uid" : response.user.uid, "identifier" : response.user.email}))
        }
      })
  }
}

export const sign_in_user_facebook = ()=>{
  return dispatch=>{
    return doSignInWithFacebookAuthProvider()
      .then(response=>{
        if(response.additionalUserInfo.isNewUser){
          dispatch(sign_up_copy_private_db({"uid" : response.user.uid, "identifier" : response.user.email}))
        }
      })
  }
}

export const auth_user = (user) => {
  console.log("user authed");
  return dispatch => {
    dispatch({
      type: AUTH_USER,
      payload : user
    });
  };
};

export const auth_error = error => {
  return dispatch => {
    dispatch({
      type: AUTH_ERROR,
      payload: error
    });
  };
};

export const sign_out_user = () =>{
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

export const verif_auth = () => {
  console.log("Verif Auth");
  return dispatch => {
    firebase.auth.onAuthStateChanged(user => {
		console.log(user)
      if (user) {
        dispatch(auth_user(user));
      } else {
        dispatch(sign_out_user());
      }
    });
  };
};
