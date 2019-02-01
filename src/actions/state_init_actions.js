import axios from "axios";
import { conf_dev } from "../config";

export const URL_API = conf_dev.url_api;
export const GET_CATEGORIES_BY_LANG = "GET_CATEGORIES_By_LANG";
export const GET_MECANICS_BY_LANG = "GET_MECANICS_BY_LANG";

export const get_categories_by_lang = () => {

  
    return dispatch => {
        return axios.get(URL_API + "/categories/eng").then(request => {
          dispatch({
            type: GET_CATEGORIES_BY_LANG,
            payload: request
          });
        });
      };
  

};
