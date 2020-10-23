import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import categories from "./categories_reducer";
import tags from "./tag_reducers";
import user from './user_reducers.js';
import userGameCollection from "./game_collection_reducers";
import gameBrowserGameCollection from "./game_browser_reducer";
import isotope from "./isotope_reducer";
import game_cards from './game_cards_reducers'
import i18n from './i18n_reducer';
import loading from './loading_reducer';
import error from './error_reducer';

export default combineReducers({
  routing: routerReducer,
  categories,
  tags,
  user,
  userGameCollection,
  gameBrowserGameCollection,
  isotope,
  game_cards,
  i18n,
  loading,
  error
})