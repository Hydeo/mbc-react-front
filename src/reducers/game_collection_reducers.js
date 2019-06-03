import {
  GET_USER_GAME_COLLECTION,
  ADD_GAME_TO_COLLECTION,
  REMOVE_GAME_FROM_COLLECTION,
  CREATE_GAME_MASK,
  TOOGLE_IN_COLLECTION
} from "../actions/game_collection_actions"

const initialState = {
  game_collection: null
}


export default (state = initialState, action) => {
  switch (action.type) {
    case GET_USER_GAME_COLLECTION:
      return {
        ...state,
        game_collection: action.payload
      }

    case ADD_GAME_TO_COLLECTION:
      return {
        ...state,
        game_collection: action.payload
      }

    case REMOVE_GAME_FROM_COLLECTION:
      return {
        ...state,
        game_collection: action.payload
        //Trim the removed game from game_collection, but first we have to sort the "each time i mount the list i request it" issue
      }
    case CREATE_GAME_MASK:
      return {
        ...state,
        game_collection: action.payload
      }
    case TOOGLE_IN_COLLECTION:
      var s_game_collection = null;
      if(state != null){
        s_game_collection = state.game_collection;
        s_game_collection.gameList.push(action.active_game);
      }
      return {
        ...state,
        game_collection : s_game_collection
      }
    default:
      return state;
  }

}