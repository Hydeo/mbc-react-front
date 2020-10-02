// @flow
import BaseGameDecorator from './BaseGameDecorator';
import BaseGame from './BaseGame';
import Game from './Game';

class GameAdditionalFieldsDecorator extends BaseGameDecorator {

    price: ? number;
    comment: ? string;
    rating: ? number;
    title: ?string;

    // $FlowFixMe
    constructor(baseGame: BaseGame, additionalFields) {
        super(baseGame);
        this.initAdditionalFields();
        this.loadAdditionalFields(additionalFields);
    }

    initAdditionalFields(){
        this.price = this.comment = this.rating = this.title = null;
    }
    
    // $FlowFixMe
    loadAdditionalFields(additionalFields) {
        for (let [key, value] of Object.entries(this)) {
            if (additionalFields.hasOwnProperty(key)) {
                // $FlowFixMe
                this[key] = additionalFields[key];
            }
        }
    }

    hasAdditionnalFields(): bool {
        return Object.keys(this.getFilledAdditionalFields()).length > 0 ? true : false;
    }

    getFilledAdditionalFields() {
        let f = {};
        if (this.getPrice() != null) {
            f["price"] = this.getPrice();
        }
        if (this.getComment() != null) {
            f["comment"] = this.getComment();
        }
        if (this.getRating() != null) {
            f["rating"] = this.getRating();
        }

        return f;
    }

    getPrice() {
        if (this.price != null) {
            return this.price;
        }
        return null;
    }

    getComment() {
        if (this.comment != null) {
            return this.comment;
        }
        return null;
    }

    getRating() {
        if (this.rating != null) {
            return this.rating;
        }
        return null;
    }

    getTitle(){
        if(this.title != null){
            return this.title;
        }
        else{
            return this.baseGame.getTitle();
        }
    }

    toString(): string {
        let af = this.getFilledAdditionalFields();
        let afString = "";
        for (let [key, value] of Object.entries(af)) {
            //$FlowIssue
            afString += "| " + key + " : " + value + " ";
        }
        return this.baseGame.toString() 
        +"Additional Fields \n"
        + afString
        +"\n";
    }
}

export default GameAdditionalFieldsDecorator;