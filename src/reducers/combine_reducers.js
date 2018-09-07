import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import user from './user_reducers.js'
import game_collection from "./game_collection_reducers";
import collection_isotope from "./basic_reducersOLD";
import i18n from './i18n_reducer'

export default combineReducers({
  routing: routerReducer,
  user,
  game_collection,
  collection_isotope,
  i18n
})