import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import user from '../reducers/user_reducers.js'
export default combineReducers({
  routing: routerReducer,
  user
})