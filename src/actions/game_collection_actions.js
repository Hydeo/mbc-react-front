import axios from "axios";
import { conf_dev } from "../config";

import { check_token_before_query } from "./utils_actions";

export const URL_API = conf_dev.url_api;
export const GET_USER_GAME_COLLECTION = "GET_USER_GAME_COLLECTION";
export const ADD_GAME_TO_COLLECTION = "ADD_GAME_TO_COLLECTION";
export const REMOVE_GAME_FROM_COLLECTION = "REMOVE_GAME_FROM_COLLECTION";
export const CREATE_GAME_MASK = "CREATE_GAME_MASK";
export const TOOGLE_IN_COLLECTION = "TOOGLE_IN_COLLECTION";

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
        axios.post(URL_API + "/GameCollection/addToCollection", { token: token, gameId: game_id }).then(request => {
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
        axios.post(URL_API + "/GameCollection/removeFromCollection", { token: token, gameId: game_id }).then(request => {
            dispatch({
                type: REMOVE_GAME_FROM_COLLECTION,
                payload: request.data
            });
        });
    };
    return check_token_before_query(callback);
};


export const create_game_mask = (game_data) => {
    var game_mask = {}
    var base_fields = ["nb_player_min", "nb_player_max", "time_to_play_max", "time_to_play_min", "age_recommended", "complexity", "tags"];
    var custom_fields = ["price", "comment", "rating","title","imageUrl"];
    game_data["price"] = "100";

    var load_non_mendatory_fields = (game_data, game_mask, field_name) => {
        if (game_data.hasOwnProperty(field_name)) {
            game_data[field_name] = game_data[field_name];
        }
        return game_mask;
    }

    var load_fields = (game_data, fields) => {
        var _gd = {}
        fields.forEach((e) => {
            if (game_data.hasOwnProperty(e)) {
                _gd[e] = game_data[e];
            }
        })
        return _gd;
    }

    
    game_mask = load_fields(game_data, custom_fields);
    game_mask.override = load_fields(game_data, base_fields);




    var callback = (token, dispatch) => {
        var data = {
            token: token,
            gameId : game_data._id,
            gameMask:{
              ...game_mask
            }
        }

        axios.put(URL_API + "/GameCollection/mask", data).then(request => {
            /*dispatch({
              type: REMOVE_GAME_FROM_COLLECTION,
              payload: request.data
            });*/
        });
    };
    return check_token_before_query(callback);
}

export const toggle_in_collection = active_game => {
    var callback = (token, dispatch) => {
        axios
            .put(URL_API + "/GameCollection/", { token: token, gameId: active_game._id })
            .then(request => {
                dispatch({
                    type: TOOGLE_IN_COLLECTION,
                    payload: request.data
                });
            });
    }
    return check_token_before_query(callback);
}

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