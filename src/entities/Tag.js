// @flow

class Tag {

    _id: string;
    tagName : string;
    localization : {
    	[string] /*lang*/ : {
            "lang" : string,
            "trad" : string
        }
    } 

    constructor(_id:string, tagName : string, localization : { [string] /*lang*/ : { "lang" : string, "trad" : string } }) {
    	this._id = _id;
    	this.tagName = tagName;
    	this.localization = localization;
    }

    getId(){
        return this._id;
    }
    
    getTrad(lang:string = "eng"){
        if(this.localization.hasOwnProperty(lang)){
           return this.localization[lang]["trad"];
        }
        return this.localization["eng"]["trad"];
    }
}

export default Tag;