import axios from "axios";
import { conf_dev } from "../config";

import { check_token_before_query } from "./utils_actions";
import { validateCallback } from "@firebase/util";

export const URL_API = conf_dev.url_api;
export const GET_USER_GAME_COLLECTION = "GET_USER_GAME_COLLECTION";


export const get_user_game_collection = () => {
  var callback = (token, dispatch) => {
    axios.post(URL_API + "/GameCollection/", { token: token }).then(request => {
      dispatch({
        type: GET_USER_GAME_COLLECTION,
        payload: request.data
      });
    });
  };
  return check_token_before_query(callback);
};

/*export const get_user_game_collection = uid => {
  return dispatch => {
    firebase.auth.onAuthStateChanged(user => {
      if (user) {
        dispatch(auth_user(user));
        user.getIdToken().then(token =>
          axios
            .post(URL_API + "/GameCollection/", { token: token })
            .then(request => {
              dispatch({
                type: GET_USER_GAME_COLLECTION,
                payload: request.data
              });
            })
        );
      } else {
        dispatch(sign_out_user());
      }
    });
  };
};*/
