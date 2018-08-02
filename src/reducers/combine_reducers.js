import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import user from '../reducers/user_reducers.js'
import game_collection from "../reducers/game_collection_reducers";

export default combineReducers({
  routing: routerReducer,
  user,
  game_collection
})