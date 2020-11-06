// @flow
import _ from 'lodash';

class TagTrad {

    id : number;
    lang : string;
    trad : string;


    constructor(id:number, lang:string, trad:string) {
    	this.id = id;
    	this.lang = lang;
    	this.trad = trad;
    }

    getId(){
        return this.id;
    }
    
    getTrad(){
        return this.trad;
    }

    getLang(){
        return this.lang;
    }

    static deserialize(jsonObject){
        if(_.has(jsonObject,'id') && _.has(jsonObject,'lang') && _.has(jsonObject,'trad')){
            return new TagTrad(jsonObject.id,jsonObject.lang,jsonObject.trad);
        }

        throw {
            message : "Couldn't deserialize TagTrad",
            data : jsonObject
        }    
    }

    static deserializeArray(jsonObject){
        let tagTragHashMap = _.mapValues(jsonObject, function(curTagTradJson){
            return TagTrad.deserialize(curTagTradJson); 
        })

        tagTragHashMap = _.mapKeys(tagTragHashMap,function(curTagTrad){
            return curTagTrad.getLang();
        })

        return tagTragHashMap;
    }
}

export default TagTrad;