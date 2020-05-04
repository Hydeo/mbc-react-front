import axios from "axios";
import { conf_dev } from "../config";

import { check_token_before_query } from "./utils_actions";

export const URL_API = conf_dev.url_api;
export const UPDATE_ACTIVE_GAME_POPUP = "UPDATE_ACTIVE_GAME_POPUP";
export const CLOSE_GAME_POPUP= "CLOSE_GAME_POPUP";

export const update_active_game_popup = game_card_state =>{
    return dispatch => {
		dispatch({
			type: UPDATE_ACTIVE_GAME_POPUP,
			payload: game_card_state
		})
	}
}

export const close_game_popup = () => {
    return dispatch =>{
        dispatch({
            type : CLOSE_GAME_POPUP
        })
    }
}



