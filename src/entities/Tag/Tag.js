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
    	this.localization = TagTrad.deserializeArray(localization);
    }

    getId(){
        return this.id;
    }
    
    getTrad(lang:string = "eng"){
        if(typeof this.localization == 'object'){
            if(_.has(this.localization,lang)){
               return this.localization[lang]["trad"];
            }
            return this.localization["eng"]["trad"];
        }
        throw "Trying to access getTrad with a reference Tag (ony id available)";
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
}

export default Tag;