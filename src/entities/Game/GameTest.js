//@flow	
import TagEntity from '../Tag';
import GameMaskDecorator from './GameMaskDecorator';
import Game from './Game';

console.log("/////////////////////////////////////////////////////////////");
console.log("/////////////////////////////////////////////////////////////");

var ng = new Game("idString", 4 ,1,10,30,5,0,[new TagEntity("5cb0a11bfb1224ca0ddc2ea9")],
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
console.log(ng.getImageUrl());

console.log("/////////////////////////////////////////////////////////////");
console.log("/////////////////////////////////////////////////////////////");

