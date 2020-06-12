// @flow
import BaseGameDecorator from './BaseGameDecorator';
import BaseGame from './BaseGame';
import Game from './Game';

class GameAdditionalFieldsDecorator extends BaseGameDecorator {

    price: ? number;
    comment: ? string;
    rating: ? number;

    constructor(baseGame: BaseGame, additionalFields) {
        super(baseGame);
        this.price = this.comment = this.rating = null;
        this.loadAdditionalFields(additionalFields);
    }

    loadAdditionalFields(additionalFields) {
        for (let [key, value] of Object.entries(this)) {
            if (additionalFields.hasOwnProperty(key)) {
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

    toString(): string {
        let af = this.getFilledAdditionalFields();
        let afString = "";
        for (let [key, value] of Object.entries(af)) {
            afString += "| " + key + " : " + value + " ";
        }
        return this.baseGame.toString() 
        +"Additional Fields \n"
        + afString
        +"\n";
    }

}

export default GameAdditionalFieldsDecorator;