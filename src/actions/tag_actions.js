
import axios from "axios";
import { conf_dev } from "../config";


export const URL_API = conf_dev.url_api;
export const GET_TAG_BY_NAME = "GET_TAG_BY_NAME";
export const GET_ALL_TAG = "GET_ALL_TAG";

export const get_all_tags = () => {
    return dispatch => {
        return axios.get(URL_API + "/tag/").then(request => {
          dispatch({
            type: GET_ALL_TAG,
            payload: request
          });
        });
      };
};
