import axios from "axios";
import { conf_dev } from "../config";

import { check_token_before_query } from "./utils_actions";

export const URL_API = conf_dev.url_api;
export const CREATE_NEW_GAME = "CREATE_NEW_GAME";
export const GET_GAME_LIBRARY = "GET_GAME_LIBRARY";

export const create_new_game = new_game => {
  console.log("ACTION NEW GAME");
  console.log(new_game);
  var new_game_profile = {
    nb_player_min: new_game.nb_player_min,
    nb_player_max: new_game.nb_player_max,
    time_to_play: new_game.time_to_play,
    age_recommended: new_game.age_recommended,
    complexity: new_game.complexity,
    type: "-1",
    categories: ["Strat", "Coop"],
    mechanism: ["Dice", "Diplomatie", "bitchy"],
    localization: {
      eng: {
        title: new_game.title,
        description: new_game.description,
        imageUrl: new_game.url_image
      }
    }
  };

  var callback = (token, dispatch) => {
    axios
      .post(URL_API + "/game/", { token: token, new_game: new_game_profile })
      .then(request => {
        dispatch({
          type: CREATE_NEW_GAME,
          payload: request.data
        });
      });
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
