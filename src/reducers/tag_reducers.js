import {
  GET_ALL_TAG
} from "../actions/tag_actions";

const initialState = {
  tags: []
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_TAG:
      return action.payload.data;
      break;

    default:
      return state;
  }
};
