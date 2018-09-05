import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import user from '../reducers/user_reducers.js'
import game_collection from "../reducers/game_collection_reducers";
import collection_isotope from "../reducers/basic_reducersOLD";

export default combineReducers({
  routing: routerReducer,
  user,
  game_collection,
  collection_isotope
})