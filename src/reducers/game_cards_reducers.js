import {
    UPDATE_ACTIVE_GAME_POPUP
} from "../actions/game_cards_actions"

const initialState = {
    active_game : null,
    open : false
}

export default (state = initialState, action) => {
    switch (action.type) {
      case UPDATE_ACTIVE_GAME_POPUP:
        return {...action.payload}
            
    default : 
      return state;
    }

}