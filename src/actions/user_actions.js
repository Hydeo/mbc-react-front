import axios from "axios";

import { conf_dev } from "../config";
import { firebase } from "../firebase";

import {
  doCreateUserWithEmailAndPassword,
  doSignInWithEmailAndPassword,
  doSignOut
} from "../firebase/auth";

export const SET_USER = "SET_USER";
export const USER_LIST = "USER_LIST";
export const SET_USER_INSTANCE = "SET_USER_INSTANCE";
export const AUTH_USER = "AUTH_USER";
export const AUTH_ERROR = "AUTH_ERROR";
export const SIGN_OUT_USER = "SIGN_OUT_USER";

export const URL_API = conf_dev.url_api;

export const set_user = user_name => {
  localStorage.setItem("user_name", user_name);
  return dispatch => {
    dispatch({
      type: SET_USER,
      payload: user_name
    }),
      dispatch(() => {
        return axios.get(URL_API + "/" + user_name + "/lists").then(request => {
          dispatch({
            type: USER_LIST,
            payload: request
          });
        });
      });
  };
};

export const set_user_instance = auth_user => {
  return dispatch => {
    console.log("alala");
    console.log(auth_user);
    dispatch({
      type: SET_USER_INSTANCE,
      payload: auth_user
    });
  };
};

export const sign_up_user = credentials => {
  return dispatch => {
    return doCreateUserWithEmailAndPassword(
      credentials.email,
      credentials.password
    )
      .then(response => {
		console.log("sign_up_user succes");
        dispatch(auth_user());
      })
      .catch(error => {
        console.log("sign_up_user error");
        dispatch(auth_error({"type" : "sign_up_error", "error" : error }));
      });
  };
};

export const sign_in_user = credentials => {
  return dispatch => {
    return doSignInWithEmailAndPassword(credentials.email, credentials.password)
      .then(response => {
        dispatch(auth_user());
      })
      .catch(error => {
		console.log("sign_in_user error");
        dispatch(auth_error({"type" : "sign_in_error",  "error" : error}));
      });
  };
};

export const auth_user = () => {
  console.log("user authed");
  return dispatch => {
    dispatch({
      type: AUTH_USER
    });
  };
};

export const auth_error = error => {
  console.log("auth ***** error");
  return dispatch => {
    dispatch({
      type: AUTH_ERROR,
      payload: error
    });
  };
};

export const sign_out_user = () =>{
	console.log('sign out user');
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
        dispatch(auth_user());
      } else {
        dispatch(sign_out_user());
      }
    });
  };
};
