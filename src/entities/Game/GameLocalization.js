// @flow
import _ from 'lodash';

class GameLocalization {

    id : number;
    title : string;
    description : string;
    imageUrl : string;
    lang : string;

    constructor(id:number, title:string, description:string, imageUrl:string, lang:string) {
    	this.id = id;
    	this.title = title;
    	this.description = description;
        this.imageUrl = imageUrl;
        this.lang = lang;
    }

    getId(){
        return this.id;
    }
    
    getTitle(){
        return this.title;
    }

    getDescription(){
        return this.description;
    }

    getImgUrl(){
        return this.imageUrl;
    }

    getLang(){
        return this.lang;
    }


    static validateJson(jsonObject){
        let hasAllFields = true;
        
        _.forEach(
            _.keys(new GameLocalization()),
            _.bind(function(e){
                if(!_.has(jsonObject,e)){
                    hasAllFields = false;
                }
            },jsonObject)
        );

        return hasAllFields;
    }


    static deserialize(jsonObject){
        if(GameLocalization.validateJson(jsonObject)){
            return new GameLocalization(
                jsonObject.id,
                jsonObject.title,
                jsonObject.description,
                jsonObject.imageUrl,
                jsonObject.lang
            );
        }

        throw "Couldn't deserialize GameLocalization : "+ JSON.stringlify();

    }

    static deserializeToHashMap(jsonObject){
        let gameLocalizationHashMap = _.mapValues(jsonObject, function(curGameLocalizationJson){
            return GameLocalization.deserialize(curGameLocalizationJson); 
        })

        gameLocalizationHashMap = _.mapKeys(gameLocalizationHashMap,function(curGameLocalization){
            return curGameLocalization.getLang();
        })

        return gameLocalizationHashMap;
    }
}

export default GameLocalization;