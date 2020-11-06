//@flow	
import TagEntity from '../Tag/Tag';
import GameMaskDecorator from './GameMaskDecorator';
import GameAdditionalFieldsDecorator from './GameAdditionalFieldsDecorator';
import Game from './Game';



export function yolo(data: [], maskData:[] = []) {

    console.log("/////////////////////////////////////////////////////////////");
    console.log(data);
    console.log("/////////////////////////////////////////////////////////////");

    let gameArray = [];
	if(data != null && data.length > 0){   
	    data.forEach(function(e, index) {
	        //Init all Games Object from the server response
	        let g = new Game(e._id, e.nb_player_min, e.nb_player_max, e.time_to_play_min, e.time_to_play_max, e.age_recommended, e.complexity,
	            e.tags.map((t) => {
	                return new TagEntity(t._id, t.tagName, t.localization)
	            }), e.localization
	        );

	        //If current game game has a mask in current collection
	        if (this != null && this.hasOwnProperty(e._id)) {
	            g = new GameMaskDecorator(g, this[e._id].override);
	            g = new GameAdditionalFieldsDecorator(g, this[e._id]);
	        }

	        gameArray.push(
	            g
	        );

	    }, maskData)

	    console.log(gameArray);
	    console.log("/////////////////////////////////////////////////////////////");
	}

	return gameArray;
}
