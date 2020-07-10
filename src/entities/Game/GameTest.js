//@flow	
import TagEntity from '../Tag';
import GameMaskDecorator from './GameMaskDecorator';
import GameAdditionalFieldsDecorator from './GameAdditionalFieldsDecorator';
import Game from './Game';



export function yolo(data: { gameList: [] }) {

    console.log("/////////////////////////////////////////////////////////////");
    console.log(data);
    console.log("/////////////////////////////////////////////////////////////");

    let gameArray = [];
	if(data != null){   
	    data.gameList.forEach(function(e, index) {
	        //Init all Games Object from the server response
	        let g = new Game(e._id, e.nb_player_min, e.nb_player_max, e.time_to_play_min, e.time_to_play_max, e.age_recommended, e.complexity,
	            e.tags.map((t) => {
	                return new TagEntity(t._id, t.tagName, t.localization)
	            }), e.localization
	        );

	        //If current game game has a mask in current collection
	        if (this.gameMask != null && this.gameMask.hasOwnProperty(e._id)) {
	            g = new GameMaskDecorator(g, this.gameMask[e._id].override);
	            g = new GameAdditionalFieldsDecorator(g, this.gameMask[e._id]);
	        }

	        gameArray.push(
	            g
	        );

	    }, data)

	    console.log(gameArray);

	    gameArray.forEach(function(e, index) {
	        console.log("--------------");
	        console.log(e.getId());
	        console.log(e.getTitle());
	        console.log(e.getDescription());
	        console.log(e.getImageUrl());
	        console.log(e.getAgeRecommended());
	        console.log(e.getNbPlayerMin());
	        console.log(e.getNbPlayerMax());
	        console.log(e.getTimeToPlayMin());
	        console.log(e.getTimeToPlayMax());
	        console.log(e.getComplexity());
	        console.log(e.hasAdditionnalFields());
	    })

	    console.log("/////////////////////////////////////////////////////////////");
	}

	return gameArray;
}
