import { 
  GET_GAME_LIBRARY
} from "../actions/game_browser_actions";

import Utils from "../utils";

const initialState = null;

export default (state = initialState, action) => {
  switch (action.type) {

    case GET_GAME_LIBRARY:

      let gameArray = action.payload;
      action.payload["gameList"] = gameArray;

      return {
        ...state,
          gameList: gameArray  //Added this gamelist to have the same structure we use for user-costom collection, so we can resue the linkList compo
      };
      break;

    default:
      return state;
  }
};
