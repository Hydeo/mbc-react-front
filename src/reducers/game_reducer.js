import { GET_GAME_LIBRARY } from "../actions/game_actions";

const initialState = null;

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_GAME_LIBRARY:
      return {
        ...state,
          gameList: action.payload.data  //Added this gamelist to have the same structure we use for user-costom collection, so we can resue the linkList compo
      };
      break;

    default:
      return state;
  }
};
