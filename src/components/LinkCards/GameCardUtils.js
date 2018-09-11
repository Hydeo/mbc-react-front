import i18n from "i18next";
const list_owner_private_properties = ["comment","price","rating"]

export const apply_game_mask = (game_data, game_mask) => {

   
    var has_mask = game_mask.hasOwnProperty(game_data._id);

    //mask application
    if (has_mask) {
      Object.keys(game_data).forEach(property_name => {
        if (game_mask[game_data._id].hasOwnProperty(property_name)) {
          game_data[property_name] =
            game_mask[game_data._id][property_name];
        }
      });
    }


    list_owner_private_properties.forEach((private_property)=>{
      if(has_mask && game_mask[game_data._id].hasOwnProperty(private_property)){
        game_data[private_property] = game_mask[game_data._id][private_property];
      }
    })
    
  };

  export const get_property_by_current_lang = (game_data,property)=>{

    //Check if localisation really exists : 
    if(game_data.localization == null){
      throw new Error('Localization is missing');
    }
    //If current user lang is not supported by the game, eng is chosen by default.
    var cur_lang = game_data.localization.hasOwnProperty(i18n.language.toLowerCase())?i18n.language.toLowerCase():"eng";
    if(game_data.localization[cur_lang].hasOwnProperty(property)){
      return game_data.localization[cur_lang][property];
    }
  }