import {
    GET_USER_GAME_COLLECTION,
    ADD_GAME_TO_COLLECTION,
    REMOVE_GAME_FROM_COLLECTION
} from "../actions/game_collection_actions"

const initialState = {
    game_collection : null
}


export default (state = initialState, action) => {
    switch (action.type) {
      case GET_USER_GAME_COLLECTION:
        return {
          ...state,
          game_collection : action.payload
        }

      case ADD_GAME_TO_COLLECTION : 
        return {
          ...state,
          game_collection : action.payload
        }

      case REMOVE_GAME_FROM_COLLECTION :
      return {
        ...state,
        game_collection : action.payload
        //Trim the removed game from game_collection, but first we have to sort the "each time i mount the list i request it" issue
      }
    
    default : 
      return state;
    }

}