//@flow
import BaseGameDecorator from './BaseGameDecorator';
import BaseGame from './BaseGame';

class GameMaskDecorator extends BaseGameDecorator{

	addedProperty : string;

	constructor(baseGame:BaseGame,addedProperty:string){
		super(baseGame);
		this.addedProperty = addedProperty;
	}


	newBehavior(string:string){
		console.log(string);
	}

	getTitle(){
		if(this.addedProperty == "+"){
			return "custom title";
		}
		else{
			return this.baseGame.getTitle();
		}
	}


    getDescription(){
        return this.baseGame.getDescription();
    }

    getImageUrl(){
        return this.baseGame.getImageUrl();
    }

}

export default GameMaskDecorator;