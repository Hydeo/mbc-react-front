import { 
  CREATE_NEW_GAME
} from "../actions/game_actions";
import {yolo} from '../entities/Game/GameTest.js';
import Utils from "../utils";

const initialState = null;

export default (state = initialState, action) => {
  switch (action.type) {
    case 'CREATE_NEW_GAME_SUCCESS':
      return{...state}
    break;

    default:
      return state;
  }
};
