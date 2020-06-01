// @flow
import TagEntity from './Tag';

class Game {

    _id: string
    nb_player_min: number;
    nb_player_max: number;
    time_to_play_min: number;
    time_to_play_max: number;
    age_recommended: number;
    complexity: number;
    tags: Array < TagEntity > ;
    localization : {
        [string] /*lang*/ : {
            "title" : string,
            "description" : string,
            "imageUrl" : string
        }
    }

    constructor(_id: string, nb_player_min: number, nb_player_max: number, time_to_play_min: number, time_to_play_max: number, age_recommended: number, complexity: number, tags: Array < TagEntity >, localization : { [string] : { "title" : string, "description" : string, "imageUrl" : string } }   ) {
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
console.log("$$$$$");
console.log(new Game("idString", 4 ,1,10,30,5,0,[new TagEntity("5cb0a11bfb1224ca0ddc2ea9")], {"eng" : {"title" : "title","description" : "description","imageUrl" : "url"}} ));
console.log("$$$$$");
export default Game;