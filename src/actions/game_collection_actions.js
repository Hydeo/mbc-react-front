import axios from "axios";
import {conf_dev} from "../config";
import { URL_API } from "./user_actions";

export const GET_USER_GAME_COLLECTION = "GET_USER_GAME_COLLECTION";


export const get_user_game_collection = user =>{
    console.log('get user collection');
    console.log(user);
    return dispatch =>{
        return axios.get(URL_API+"/GameCollection/"+user.name)
            .then((request)=>{
                console.log('Request back');
                console.log(request)
            })
    }
}
