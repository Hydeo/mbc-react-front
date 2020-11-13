// @flow
import _ from 'lodash';
import TagTrad from './TagTrad';

class Tag {

    id: string;
    name : ?string;
    localization : {
    	[string] /*lang*/ : TagTrad
    } = {};

    constructor(id:string, name : ?string, localization : { [string] /*lang*/ : { "lang" : string, "trad" : string } } = {}) {
    	this.id = id;
    	this.name = name;
    	this.localization = TagTrad.deserializeToHashMap(localization);

        //Eng translation is mandatory, any tag without it need to be discarded
        //Caller has to handle the error
        if(this.getTrad() == ""){
             throw "No ENG localization available for this Tag (id: "+this.getId()+")";
        }
    }

    getId(){
        return this.id;
    }
    
    getName(){
        return this.name;
    }

    getTrad(lang:string = "eng"){
        if(typeof this.localization == 'object' && !_.isEmpty(this.localization)){
            if(_.has(this.localization,lang)){
               return this.localization[lang]["trad"];
            }
            return this.localization["eng"]["trad"];
        }

        return "";
    }

    static deserialize(jsonObject){

        if(_.has(jsonObject,'id') && _.has(jsonObject,'name') && _.has(jsonObject,'localization')){
            return new Tag(
                jsonObject.id,
                jsonObject.name,
                jsonObject.localization
            );
        }

        throw {
            message : "Couldn't deserialize tag",
            data : jsonObject
        }
        
    }

    static deserializeToArray(jsonObject){
        let tagsArray = [];
        jsonObject.map((t) => {
            try{
                tagsArray.push(Tag.deserialize(t));
            }
            catch(err){
                /* If a Tag couldn't be deserialized we ignore it and go to the next */
            }
        })        
        return tagsArray;
    }
}

export default Tag;