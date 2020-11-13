import GameCollection from "../entities/GameCollection/GameCollection";
import _ from "lodash";

import {
    GET_USER_GAME_COLLECTION,
    GET_COLLECTION,
    CREATE_GAME_MASK,
    TOOGLE_IN_COLLECTION,
    TOOGLE_PRIVACY_COLLECTION
} from "../actions/game_collection_actions"


const initialState = {
    userGameCollection: null
}


export default (state = initialState, action) => {
    let gc = null;
    switch (action.type) {
        case GET_USER_GAME_COLLECTION:

            gc = new GameCollection(
                action.payload.id,
                action.payload.userId,
                action.payload.isPublic,
                GameCollection.deserialize(action.payload.gameList),
                action.payload.gameMask
            );

            return {
                ...state,
                userGameCollection: gc
            }

        case GET_COLLECTION:

                gc = new GameCollection(
                    action.payload.id,
                    action.payload.userId,
                    action.payload.isPublic,
                    GameCollection.deserialize(action.payload.gameList),
                    action.payload.gameMask
                );

                return {
                    ...state,
                    publicCollection: gc
                }

        case CREATE_GAME_MASK:
            gc = new GameCollection(
                action.payload.id,
                action.payload.userId,
                action.payload.isPublic,
                GameCollection.deserialize(action.payload.gameList),
                action.payload.gameMask
            );
            return {
                ...state,
                userGameCollection: gc
            }

        case TOOGLE_IN_COLLECTION:
            gc = new GameCollection(
                action.payload.id,
                action.payload.userId,
                action.payload.isPublic,
                GameCollection.deserialize(action.payload.gameList),
                action.payload.gameMask
            );
            return {
                ...state,
                userGameCollection: gc
            }

        case TOOGLE_PRIVACY_COLLECTION:
            let ns = {
                ...state
            }
            if(_.has(ns,"userGameCollection")){
                ns.userGameCollection.isPublic = !ns.userGameCollection.isPublic; 
            }
            return ns;

        default:
            return state;
    }

}