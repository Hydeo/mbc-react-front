import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import state_init from "./state_init_reducers";
import user from './user_reducers.js';
import game_collection from "./game_collection_reducers";
import game_library from "./game_reducer";
import collection_isotope from "./basic_reducersOLD";
import game_cards from './game_cards_reducers'
import i18n from './i18n_reducer';

export default combineReducers({
  routing: routerReducer,
  state_init,
  user,
  game_collection,
  game_library,
  collection_isotope,
  game_cards,
  i18n
})