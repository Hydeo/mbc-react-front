import {
  GET_CATEGORIES_BY_LANG
} from "../actions/state_init_actions";

const initialState = {
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_CATEGORIES_BY_LANG:
      return {
        ...state,
        categories: action.payload.data.categories  //Added this gamelist to have the same structure we use for user-costom collection, so we can resue the linkList compo
      };

    default:
      return state;
  }
};
