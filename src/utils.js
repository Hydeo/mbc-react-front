import { conf_dev } from './config';
import i18n from "i18next";

//----- Entities -----
import TagEntity from './entities/Tag';
import GameMaskDecorator from './entities/Game/GameMaskDecorator';
import GameAdditionalFieldsDecorator from './entities/Game/GameAdditionalFieldsDecorator';
import Game from './entities/Game/Game';


const list_owner_private_properties = ["comment", "price", "rating","imageUrl","title"]

class Utils {

    static is_url(str) {
        var regexp = /^(?:(?:https?|ftp):\/\/)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:\/\S*)?$/;
        if (regexp.test(str)) {
            return true;
        } else {
            return false;
        }
    }

    static getTypeSizeScreen(breakpoints, screen_width) {
        if (screen_width < breakpoints.S)
            return "S";
        if (screen_width < breakpoints.M)
            return "M";
        if (screen_width < breakpoints.L)
            return "L";
        return "L";
    }

    static getWidth() {
        return Math.max(
            document.body.scrollWidth,
            document.documentElement.scrollWidth,
            document.body.offsetWidth,
            document.documentElement.offsetWidth,
            document.documentElement.clientWidth
        );
    }


    static calculateIsotopeItemWidth(gutter_size) {
        var nb_item = conf_dev.isotope_nb_item[Utils.getTypeSizeScreen(conf_dev.breakpoints, window.screen.width)];
        var nb_gutters = nb_item - 1;
        var item_width = (100 - (nb_gutters * gutter_size)) / nb_item;
        //console.log("URILS :  " + item_width + " -- "+Utils.getTypeSizeScreen(conf_dev.breakpoints, window.screen.width))
        return item_width;
    }


    static calculateIsotopeItemWidthPx(gutter_size) {
        var list_container_width = this.getWidth() - 48 // minus margin/padding the list has 
        var nb_item = conf_dev.isotope_nb_item[Utils.getTypeSizeScreen(conf_dev.breakpoints, list_container_width)];
        var nb_gutters = nb_item - 1;
        var gutter_width = Math.floor((gutter_size * list_container_width) / 100);
        var item_width = Math.floor((list_container_width - (nb_gutters * gutter_width)) / nb_item);
        var occupied_width = (item_width * nb_item) + (nb_gutters * gutter_width)
        //console.log(item_width + " / "+gutter_width+ " = "+ list_container_width + "("+ occupied_width +")"+	 " -- "+Utils.getTypeSizeScreen(conf_dev.breakpoints, list_container_width)+" "+nb_item+" "+nb_gutters)
        if ((list_container_width - occupied_width) < 4)
            return item_width - nb_item;
        return item_width
    }


    //TODO : Create a GameCollection entity and put that there
    static init_game_collection(data, maskData = null){ 
        let gameArray = [];
        if(data != null){   
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
        }

        return gameArray;
    }


    //DEPRECIATED
    static get_game_localized_property = (game_data, property) => {

        //Check if localisation really exists : 
        if (game_data.localization == null) {
            throw new Error('Localization is missing');
        }

        //If we go through that means we have a custom values set by the owner, it overrides the normal localized value
        if(list_owner_private_properties.includes(property)){
        	if(game_data.hasOwnProperty(property)){
        		return game_data[property];
        	}
        }
        //If current user lang is not supported by the game, eng is chosen by default.
        var cur_lang = game_data.localization.hasOwnProperty(i18n.language.toLowerCase()) ? i18n.language.toLowerCase() : "eng";
        if (game_data.localization[cur_lang].hasOwnProperty(property)) {
            return game_data.localization[cur_lang][property];
        }
        return "";
    }



    //DEPRECIATED
    static apply_game_mask(game_data, game_mask){
        Object.keys(game_data).forEach(property_name => {
            if (game_mask.override.hasOwnProperty(property_name) && game_mask.override[property_name] != null) {
                game_data[property_name] =
                    game_mask.override[property_name];
            }
        });

        list_owner_private_properties.forEach((private_property) => {
            if (game_mask.hasOwnProperty(private_property)) {
                game_data[private_property] = game_mask[private_property];
            }
        })
    };

    static objectMap = (obj, fn, context) =>
        Object.fromEntries(
            Object.entries(obj).map(
                ([k, v], i) => [k, fn(v, k, i, context)]
            )
        )
}

export default Utils