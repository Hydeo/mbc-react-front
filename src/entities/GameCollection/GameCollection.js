// @flow
import i18n from "i18next";
import { conf_dev } from "../../config";

//----- Entities -----
import TagEntity from '../Tag';
import GameMaskDecorator from '../Game/GameMaskDecorator';
import GameAdditionalFieldsDecorator from '../Game/GameAdditionalFieldsDecorator';
import Game from '../Game/Game';

class GameCollection {

    _id: string;
    userId: string;
    isPublic : bool;
    gameList : Array<Game>;


    constructor( _id : string, userId: string, isPublic : bool, gameList : Array<Game>) {
        this._id = _id;
        this.userId = userId;
        this.isPublic = isPublic;
        this.gameList = gameList;
    }

    getId(): string {
        return this._id;
    }

    getUserId(): string {
        return this.userId;
    }

    getIsPublic():bool{
        return this.isPublic;
    }


    toString(): string {
        return "Base:\n"+
            + "\n";
    }

    static deserializationGameList(data, maskData: [] = []){ 
        let gameList = [];

        if(data != null && data.length > 0){   
            data.forEach(function(e, index) {
                //Init all Games Object from the server response
                let g = new Game(
                    e._id,
                    e.nb_player_min, 
                    e.nb_player_max, 
                    e.time_to_play_min, 
                    e.time_to_play_max, 
                    e.age_recommended, 
                    e.complexity,
                    e.tags.map((t) => {
                        return new TagEntity(t._id, t.tagName, t.localization)
                    }), e.localization
                );
                //If current game game has a mask in current collection
                if (this != null && this.hasOwnProperty(e._id)) {
                    g = new GameMaskDecorator(g, this[e._id].override);
                    g = new GameAdditionalFieldsDecorator(g, this[e._id]);
                }
                gameList.push(
                    g
                );
            }, maskData)
        }
        return gameList;
    }

}

export default GameCollection;