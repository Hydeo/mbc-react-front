import axios from "axios";
import { conf_dev } from "../config";
import Utils from "../utils";
import { validateFirebaseToken } from "./utils_actions";

//----- Action Names --
export const URL_API = conf_dev.url_api;
export const GET_USER_GAME_COLLECTION = "GET_USER_GAME_COLLECTION";
export const GET_COLLECTION = "GET_COLLECTION";
export const CREATE_GAME_MASK = "CREATE_GAME_MASK";
export const TOOGLE_IN_COLLECTION = "TOOGLE_IN_COLLECTION";
export const TOOGLE_PRIVACY_COLLECTION = "TOOGLE_PRIVACY_COLLECTION";

export const getUserGameCollection = () => {
    var callback = (token, dispatch) => {
        axios.post(URL_API + "/GameCollection/", { token: token }).then(request => {
            dispatch({
                type: GET_USER_GAME_COLLECTION,
                payload: request.data
            });
        });
    };
    return validateFirebaseToken(callback);
};

export const getGameCollectionById = (id) => {
    var callback = (token, dispatch) => {
        axios.get(URL_API + "/GameCollection/" + id, { token: token }).then(request => {
            dispatch({
                type: GET_COLLECTION,
                payload: request.data
            });
        });
    };
    return validateFirebaseToken(callback);
};


export const create_game_mask = (game_data) => {
    var game_mask = {}
    //TODO : Replace these fields by the properties of Game objects
    var base_fields = ["nb_player_min", "nb_player_max", "time_to_play_max", "time_to_play_min", "age_recommended", "complexity", "tags"];
    var custom_fields = ["price", "comment", "rating", "title", "imageUrl"];
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
                if (e == "tags") {
                    let tagIdArray = [];
                    game_data[e].forEach((c) => {
                        tagIdArray.push({ _id: c.getId() });
                    });
                    _gd[e] = tagIdArray;
                } else {
                    _gd[e] = game_data[e];
                }
            }
        })
        return _gd;
    }


    game_mask = load_fields(game_data, custom_fields);
    game_mask.override = load_fields(game_data, base_fields);




    var callback = (token, dispatch) => {
        var data = {
            token: token,
            gameId: game_data.game.getId(),
            gameMask: {
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
    return validateFirebaseToken(callback);
}

export const toggle_in_collection = active_game => {
    var callback = (token, dispatch) => {
        axios
            .put(URL_API + "/GameCollection/", { token: token, gameId: active_game.getId() })
            .then(request => {
                dispatch({
                    type: TOOGLE_IN_COLLECTION,
                    payload: Utils.init_game_collection(request.data.gameList, request.data.gameMask)
                });
            });
    }
    return validateFirebaseToken(callback);
}


export const toggleIsPublicCollection = collection => {
    var callback = (token, dispatch) => {
        axios
            .put(URL_API + "/GameCollection/privacy", { token: token })
            .then(request => {
                dispatch({
                    type: TOOGLE_PRIVACY_COLLECTION,
                    payload: request.data
                });
            });
    }
    return validateFirebaseToken(callback);
}

/*export const getUserGameCollection = uid => {
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