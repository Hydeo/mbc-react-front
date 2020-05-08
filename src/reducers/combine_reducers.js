import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import categories_reducer from "./categories_reducer";
import tags from "./tag_reducers";
import user from './user_reducers.js';
import game_collection from "./game_collection_reducers";
import game_library from "./game_reducer";
import isotope from "./isotope_reducer";
import game_cards from './game_cards_reducers'
import i18n from './i18n_reducer';
import loading_reducer from './loading_reducer';
import error_reducer from './error_reducer';

export default combineReducers({
  routing: routerReducer,
  categories_reducer,
  tags,
  user,
  game_collection,
  game_library,
  isotope,
  game_cards,
  i18n,
  loading_reducer,
  error_reducer
})