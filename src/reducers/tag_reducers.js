import {
  GET_ALL_TAG
} from "../actions/tag_actions";
import Tag from '../entities/Tag/Tag';
import _ from 'lodash';

const initialState = []

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_TAG:
    var payload = action.payload.data;
    var tags = _.mapValues(payload, function(v){
      return Tag.deserialize(v);
    })
    return tags;

    default:
      return state;
  }
};
