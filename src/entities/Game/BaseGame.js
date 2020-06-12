// @flow
import TagEntity from '../Tag';
import i18n from "i18next";

class BaseGame {

    _id: string
    nb_player_min: number;
    nb_player_max: number;
    time_to_play_min: number;
    time_to_play_max: number;
    age_recommended: number;
    complexity: number;
    tags: Array < TagEntity > ;
    localization : {
        [string] /*lang*/ : {
            "title" : string,
            "description" : string,
            "imageUrl" : string
        }
    }

    constructor(){

    }

    getTitle() : string{
        let title = this.getLocalizedProperty("title");
        return title == null ? "Unknown Title" : title;
    }

    getDescription() : string {
        let description = this.getLocalizedProperty("description");
        return description == null ? "" : description;
    }

     getImageUrl() : string {
        let imageUrl = this.getLocalizedProperty("imageUrl");
        return imageUrl == null ? "https://tof.cx/images/2020/05/04/b1aced89d62e6505d1f141655b5964e7.png" : imageUrl;
    }

    getLocalizedProperty(property:string) : string {
        let gameLang = this.localization.hasOwnProperty(this.geti18nLang()) ? this.geti18nLang() : 'eng';
        if (this.localization[gameLang].hasOwnProperty(property)) {
            return this.localization[gameLang][property];
        }
        return "";
    }

    geti18nLang() : string {
        try{
            return i18n.language.toLowerCase();
        }
        catch(e){
            return 'eng';
        }
    }

}

export default BaseGame;