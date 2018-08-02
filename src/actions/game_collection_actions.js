import axios from "axios";
import {conf_dev} from "../config";
import { URL_API } from "./user_actions";

export const GET_USER_GAME_COLLECTION = "GET_USER_GAME_COLLECTION";


export const get_user_game_collection = uid =>{
    console.log('get user collection');
    console.log(uid);
    return dispatch =>{
        return axios.get(URL_API+"/GameCollection/"+uid)
            .then((request)=>{
                dispatch({
                    type : GET_USER_GAME_COLLECTION,
                    payload : request.data
                })
            })
    }
}
