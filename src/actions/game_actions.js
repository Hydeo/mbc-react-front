import axios from "axios";
import { conf_dev } from "../config";
 
import { 
  check_token_before_query,
  loading_request_start,
  loading_request_success,
  loading_request_failure } from "./utils_actions";

export const URL_API = conf_dev.url_api;
export const CREATE_NEW_GAME = "CREATE_NEW_GAME";
export const GET_GAME_LIBRARY = "GET_GAME_LIBRARY";

export const create_new_game = new_game => {
  var new_game_profile = {
    nb_player_min: new_game.nb_player_min,
    nb_player_max: new_game.nb_player_max,
    time_to_play_max: new_game.time_to_play_min,
    time_to_play_min: new_game.time_to_play_max,
    age_recommended: new_game.age_recommended,
    complexity: new_game.complexity,
    tags: new_game.tags,
    localization: {
      eng: {
        title: new_game.title,
        description: new_game.description,
        imageUrl: new_game.imageUrl
      }
    }
  };

  var callback = (token, dispatch) => {
    dispatch(loading_request_start(CREATE_NEW_GAME));
    return axios
      .post(URL_API + "/game/", { token: token, new_game: new_game_profile })
      .then(request => {
        //SetTimout to non desired double-click, better enforcement could be made 
        //on the form e.g: desable button until modification is made or redirect
        setTimeout(()=>{dispatch(loading_request_success(CREATE_NEW_GAME));}, 300);
        dispatch({
          type: CREATE_NEW_GAME,
          payload: request.data
        });
      })
      .catch(error =>{
         setTimeout(()=>{dispatch(loading_request_failure(CREATE_NEW_GAME,error))}, 300);
      })
  };
  return check_token_before_query(callback);
};

export const get_game_library = () => {
  return dispatch => {
    return axios.get(URL_API + "/game").then(request => {
      dispatch({
        type: GET_GAME_LIBRARY,
        payload: request
      });
    });
  };
};
