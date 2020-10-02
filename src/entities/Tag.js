// @flow
import _ from 'lodash';

class Tag {

    _id: string;
    tagName : ?string;
    localization : {
    	[string] /*lang*/ : {
            "lang" : string,
            "trad" : string
        }
    } = {};

    constructor(_id:string, tagName : ?string, localization : { [string] /*lang*/ : { "lang" : string, "trad" : string } } = {}) {
    	this._id = _id;
    	this.tagName = tagName;
    	this.localization = localization;
    }

    getId(){
        return this._id;
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
}

export default Tag;