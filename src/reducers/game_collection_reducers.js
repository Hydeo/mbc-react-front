import {
    GET_USER_GAME_COLLECTION
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
      break;

    
    default : 
      return state;
    }

}