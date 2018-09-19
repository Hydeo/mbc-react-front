
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