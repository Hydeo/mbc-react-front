import {UPDATE_LANG} from "../actions/utils_actions";

const initialState = {
    cur_lang : "eng"
}

export default (state = initialState, action) => {
    switch (action.type) {
      case UPDATE_LANG:
        return {
          ...state,
          cur_lang : action.payload
        }
      break;

    
    default : 
      return state;
    }

}