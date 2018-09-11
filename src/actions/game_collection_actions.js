import axios from "axios";
import { conf_dev } from "../config";

import { check_token_before_query } from "./utils_actions";

export const URL_API = conf_dev.url_api;
export const GET_USER_GAME_COLLECTION = "GET_USER_GAME_COLLECTION";
export const ADD_GAME_TO_COLLECTION = "ADD_GAME_TO_COLLECTION";
export const REMOVE_GAME_FROM_COLLECTION = "REMOVE_GAME_FROM_COLLECTION";

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

export const add_game_to_collection = game_id => {
  var callback = (token, dispatch) => {
    axios.post(URL_API + "/GameCollection/addToCollection", { token: token, gameId : game_id }).then(request => {
      dispatch({
        type: ADD_GAME_TO_COLLECTION,
        payload: request.data
      });
    });
  };
  return check_token_before_query(callback);
};

export const remove_game_from_collection = game_id => {
  var callback = (token, dispatch) => {
    console.log(token + " - "+game_id);
    axios.post(URL_API + "/GameCollection/removeFromCollection", { token: token, gameId : game_id }).then(request => {
      dispatch({
        type: REMOVE_GAME_FROM_COLLECTION,
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
