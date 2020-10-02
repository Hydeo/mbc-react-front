// @flow
import TagEntity from '../Tag';
import Game from '../Game/Game';
import i18n from "i18next";
import { conf_dev } from "../../config";

class GameCollection {

    _id: string;
    isPublic : ?bool;
    gameList : Array<Game>;


    constructor( _id : string, isPublic : bool, gameList : Array<Game>) {
        this._id = _id;
        this.isPublic = isPublic;
        this.gameList = gameList;
    }

    getId(): string {
        return this._id;
    }

    toString(): string {
        return "Base:\n"+
            + "\n";
    }

}

export default GameCollection;