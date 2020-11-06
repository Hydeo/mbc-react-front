import axios from "axios";
import { conf_dev } from "../config";
import Utils from "../utils";

 
export const URL_API = conf_dev.url_api;

export const GET_GAME_LIBRARY = "GET_GAME_LIBRARY";

export const getGameBrowserInitData = () => {
  return dispatch => {
    return axios.get(URL_API + "/game").then(request => {
      dispatch({
        type: GET_GAME_LIBRARY,
        payload:request.data
      });
    });
  };
};
