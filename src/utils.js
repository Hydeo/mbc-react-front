import { conf_dev } from './config';
import i18n from "i18next";

const list_owner_private_properties = ["comment","price","rating"]

class Utils {
	
	static is_url(str) {
		var regexp = /^(?:(?:https?|ftp):\/\/)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:\/\S*)?$/;
		if (regexp.test(str)) {
			return true;
		}
		else {
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

	static calculateIsotopeItemWidth(gutter_size) {
		var nb_item = conf_dev.isotope_nb_item[Utils.getTypeSizeScreen(conf_dev.breakpoints, window.screen.width)];
		var nb_gutters = nb_item - 1;
		var item_width = (100 - (nb_gutters * gutter_size)) / nb_item;
		console.log("URILS :  " + item_width)
		return item_width;
	}

	static get_game_localized_property = (game_data, property) => {
		
		//Check if localisation really exists : 
		if (game_data.localization == null) {
			throw new Error('Localization is missing');
		}

		//If current user lang is not supported by the game, eng is chosen by default.
		var cur_lang = game_data.localization.hasOwnProperty(i18n.language.toLowerCase()) ? i18n.language.toLowerCase() : "eng";
		if (game_data.localization[cur_lang].hasOwnProperty(property)) {
			return game_data.localization[cur_lang][property];
		}
		return "";
	}




	static  apply_game_mask = (game_data, game_mask) => {
				Object.keys(game_data).forEach(property_name => {
					if (game_mask.hasOwnProperty(property_name)) {
						game_data[property_name] =
							game_mask[property_name];
					}
				});
	
			list_owner_private_properties.forEach((private_property)=>{
				if(game_mask.hasOwnProperty(private_property)){
					game_data[private_property] = game_mask[private_property];
				}
			})
		};
}

export default Utils