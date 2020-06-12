// @flow

class Tag {

    _id: {_id: string};
    tagName : string;
    localization : {
    	[string] /*lang*/ : {
            "lang" : string,
            "trad" : string
        }
    } 

    constructor(_id:string, tagName : string, localization : { [string] /*lang*/ : { "lang" : string, "trad" : string } }) {
    	this._id = {_id};
    	this.tagName = tagName;
    	this.localization = localization;
    }
}

export default Tag;