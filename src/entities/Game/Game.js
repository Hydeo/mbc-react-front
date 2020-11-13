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

    //Compares Json properties with the one of the current object
    //NB : only the initiated properties of the class can be detected by the _.keys(), see BaseGame
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
        //We check if the JSON has the corespondent properties 
        if(Game.validateJson(jsonObject)){
            //We map all the JSON properties to the Current class properties
            let deserializedGame =  new Game(
                jsonObject.id,
                jsonObject.nbPlayerMin, 
                jsonObject.nbPlayerMax, 
                jsonObject.timeToPlayMin, 
                jsonObject.timeToPlayMax, 
                jsonObject.ageRecommended, 
                jsonObject.complexity,
                Tag.deserializeToArray(jsonObject.tags), 
                GameLocalization.deserializeToHashMap(jsonObject.localizations)
            );
            //Eng localization is mandatory, if a game is missing it we dismiss it, the caller has to handle the issue
            if(!_.has(deserializedGame.localizations,"eng")){
                throw "Game id " + deserializedGame.getId() + " is missing a eng GameLocalization";
            }
            return deserializedGame;
        } 
        else{
            throw "Invalid json for  Game deserialization : " + JSON.stringify(jsonObject);
        }
        
    }

}

export default Game;