import axios from "axios";
import { conf_dev } from "../config";

import { validateFirebaseToken } from "./utils_actions";

export const URL_API = conf_dev.url_api;
export const UPDATE_ACTIVE_GAME_POPUP = "UPDATE_ACTIVE_GAME_POPUP";

export const updateActiveGamePopup = game_card_state =>{
    return dispatch => {
		dispatch({
			type: UPDATE_ACTIVE_GAME_POPUP,
			payload: game_card_state
		})
	}
}

