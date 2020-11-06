// @flow
import Tag from '../Tag/Tag';
import GameLocalization from './GameLocalization';
import BaseGame from './BaseGame';
import i18n from "i18next";
import _ from 'lodash';

class Game extends BaseGame{

    constructor(_id: string, nb_player_min: number, nb_player_max: number, time_to_play_min: number, time_to_play_max: number, age_recommended: number, complexity: number, tags: Array < Tag >, localizations : { [string] : { "title" : string, "description" : string, "imageUrl" : string } }   ) 
    {
        super();
        this.id = _id
        this.nbPlayerMin = nb_player_min
        this.nbPlayerMax = nb_player_max
        this.timeToPlayMin = time_to_play_min
        this.timeToPlayMax = time_to_play_max
        this.ageRecommended = age_recommended
        this.complexity = complexity
        this.tags = tags
        this.localizations = localizations;
    }

    static validateJson(jsonObject){
        let hasAllFields = true;
        
        _.forEach(
            _.keys(new Game()),
            _.bind(function(e){
                if(!_.has(jsonObject,e)){
                    hasAllFields = false;
                }
            },jsonObject)
        );

        return hasAllFields;
    }

    static deserialize(jsonObject){
        if(Game.validateJson(jsonObject)){
            return new Game(
                jsonObject.id,
                jsonObject.nbPlayerMin, 
                jsonObject.nbPlayerMax, 
                jsonObject.timeToPlayMin, 
                jsonObject.timeToPlayMax, 
                jsonObject.ageRecommended, 
                jsonObject.complexity,
                jsonObject.tags.map((t) => {
                    return Tag.deserialize(t);
                }), 
                GameLocalization.deserializeToHashMap(jsonObject.localizations)
            )
        } 
        else{
            throw "Invalid json for  Game deserialization : " + JSON.stringify(jsonObject);
        }
        
    }

}

export default Game;