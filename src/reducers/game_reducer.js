import { 
  GET_GAME_LIBRARY,
  CREATE_NEW_GAME
} from "../actions/game_actions";

const initialState = null;

export default (state = initialState, action) => {
  switch (action.type) {
    case 'CREATE_NEW_GAME_SUCCESS':
    return{...state}
    break;
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
