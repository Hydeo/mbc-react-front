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
    data.gameList.forEach(function(e, index) {
        //Init all Games Object from the server response
        let g = new Game(e._id, e.nb_player_min, e.nb_player_max, e.time_to_play_min, e.time_to_play_max, e.age_recommended, e.complexity,
            e.tags.map((t) => {
                return new TagEntity(t._id, t.tagName, t.localization)
            }), e.localization
        );

        //If current game game has a mask in current collection
        if (this.gameMask.hasOwnProperty(e._id)) {
            g = new GameMaskDecorator(g, this.gameMask[e._id].override);
            g = new GameAdditionalFieldsDecorator(g,this.gameMask[e._id]);
        }
        
        gameArray.push(
            g
        );

    }, data)

    console.log(gameArray);
    gameArray.forEach(function(e, index) {
        console.log(e.toString());
    })


    /*
    var ng = new Game("idString", 4 ,1,10,30,5,0,[new TagEntity("5cb0a11bfb1224ca0ddc2ea9","",{eng : {lang:"eng",trad:"tagTrad"}})],
    	{
    		"eng" : {"title" : "This is a title en","description" : "description en ","imageUrl" : "imageUrl en"},
    		"fr" : {"title" : "This is a title fr ","description" : "description fr","imageUrl" : "imageUrl fr"}
    	}
    );

    console.log(ng);
    console.log(ng.getTitle());
    console.log(ng.getDescription());
    console.log(ng.getImageUrl());

    var ng = new GameMaskDecorator(ng,"-");
    console.log(ng);
    console.log(ng.getTitle());
    console.log(ng.getDescription());
    console.log(ng.getImageUrl());*/

    console.log("/////////////////////////////////////////////////////////////");
    console.log("/////////////////////////////////////////////////////////////");
}