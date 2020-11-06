// @flow
import i18n from "i18next";
import { conf_dev } from "../../config";
import _ from 'lodash';
//----- Entities -----
import Tag from '../Tag/Tag';
import GameMaskDecorator from '../Game/GameMaskDecorator';
import GameAdditionalFieldsDecorator from '../Game/GameAdditionalFieldsDecorator';
import Game from '../Game/Game';

class GameCollection {

    _id: string;
    userId: string;
    isPublic : bool;
    gameList : Array<Game>;
    gameMaskList : {};

    constructor( _id : string, userId: string, isPublic : bool, gameList : Array<Game>, gameMaskList = {}) {
        this._id = _id;
        this.userId = userId;
        this.isPublic = isPublic;
        this.gameList = gameList;
        this.gameMaskList = gameMaskList;
        this.applyGameMaskToCollection();
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
                        return Tag.deserialize(t);
                    }), e.localization
                );
                gameList.push(
                    g
                );
            }, maskData)
        }
        return gameList;
    }

    applyGameMaskToCollection() {
        if(_.size(this.gameMaskList) > 0){
            for(let i = 0 ; i < _.size(this.gameList); i++){
                let curGame = this.gameList[i];
                if(this.gameMaskList.hasOwnProperty(curGame.getId())){
                    let g = new GameMaskDecorator(curGame, this.gameMaskList[curGame.getId()].override);
                    g = new GameAdditionalFieldsDecorator(g, this.gameMaskList[curGame.getId()]);
                    this.gameList[i] = g;
                }
            }
        }
    }

}

export default GameCollection;