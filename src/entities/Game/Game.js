// @flow
import TagEntity from '../Tag/Tag';
import BaseGame from './BaseGame';
import i18n from "i18next";

class Game extends BaseGame{

    constructor(_id: string, nb_player_min: number, nb_player_max: number, time_to_play_min: number, time_to_play_max: number, age_recommended: number, complexity: number, tags: Array < TagEntity >, localization : { [string] : { "title" : string, "description" : string, "imageUrl" : string } }   ) 
    {
        super();
        this._id = _id;
        this.nb_player_min = nb_player_min;
        this.nb_player_max = nb_player_max;
        this.time_to_play_min = time_to_play_min;
        this.time_to_play_max = time_to_play_max;
        this.age_recommended = age_recommended;
        this.complexity = complexity;
        this.tags = tags;
        this.localization = localization;
    }

}

export default Game;