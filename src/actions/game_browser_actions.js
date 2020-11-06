import axios from "axios";
import { conf_dev } from "../config";
import Utils from "../utils";

import GameCollection from "../entities/GameCollection/GameCollection";
 
export const URL_API = conf_dev.url_api;

export const GET_GAME_LIBRARY = "GET_GAME_LIBRARY";

export const getGameBrowserInitData = () => {
  return dispatch => {
    return axios.get(URL_API + "/game").then(request => {
      dispatch({
        type: GET_GAME_LIBRARY,
        payload: GameCollection.deserializationGameList(request.data)
      });
    });
  };
};
