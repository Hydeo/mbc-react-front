//@flow
import BaseGame from './BaseGame';

class BaseGameDecorator extends BaseGame{

	baseGame : BaseGame

	constructor(baseGame:BaseGame){
		super();
		this.baseGame = baseGame;
	}

}

export default BaseGameDecorator;