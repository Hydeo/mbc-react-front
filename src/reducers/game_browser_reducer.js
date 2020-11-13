import { 
  GET_GAME_LIBRARY
} from "../actions/game_browser_actions";

import Utils from "../utils";
import GameCollection from "../entities/GameCollection/GameCollection";

const initialState = null;

export default (state = initialState, action) => {
  switch (action.type) {

    case GET_GAME_LIBRARY:
      let gameBrowserList = GameCollection.deserialize(action.payload);
      return {
        ...state,
          gameList: gameBrowserList   //Added this gamelist to have the same structure we use for user-costom collection, so we can resue the linkList compo
      };
      break;

    default:
      return state;
  }
};
