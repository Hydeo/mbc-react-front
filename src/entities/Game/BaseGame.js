// @flow
import TagEntity from '../Tag';
import i18n from "i18next";
import { conf_dev } from "../../config";

class BaseGame {

    _id: string
    nb_player_min: number;
    nb_player_max: number;
    time_to_play_min: number;
    time_to_play_max: number;
    age_recommended: number;
    complexity: number;
    tags: Array < TagEntity > ;
    localization: {
        [string] /*lang*/: {
            "title": string,
            "description": string,
            "imageUrl": string
        }
    }

    constructor() {

    }

    getId(): string {
        return this._id;
    }

    getTags() : Array < TagEntity>{
        return this.tags;
    }

    getNbPlayerMin(): number {
        return this.nb_player_min;
    }

    getNbPlayerMax(): number {
        return this.nb_player_max;
    }

    getTimeToPlayMin(): number {
        return this.time_to_play_min;
    }
    getTimeToPlayMax(): number {
        return this.time_to_play_max;
    }

    getAgeRecommended(): number {
        return this.age_recommended;
    }

    getComplexity(): number {
        return this.complexity;
    }

    getTitle(): string {
        let title = this.getLocalizedProperty("title");
        return title == null ? null : title;
    }

    getDescription(): string {
        let description = this.getLocalizedProperty("description");
        return description == null ? "" : description;
    }

    getImageUrl(): string {
        let imageUrl = this.getLocalizedProperty("imageUrl");
        return imageUrl == null ? conf_dev.url_fallback_img : imageUrl;
    }

    getLocalizedProperty(property: string): string {
        if(this.localization != null){
            let gameLang = this.localization.hasOwnProperty(this.geti18nLang()) ? this.geti18nLang() : 'eng';
            if (this.localization[gameLang].hasOwnProperty(property)) {
                return this.localization[gameLang][property];
            }
        }
        return null;
    }

    geti18nLang(): string {
        try {
            return i18n.language.toLowerCase();
        } catch (e) {
            return 'eng';
        }
    }

    hasAdditionnalFields(): bool{
        return false;
    }

    toString(): string {
        return "Base:\n"+
            "Id: " + this.getId() +
            " | Title: " + this.getTitle() +
            " | Description: " + this.getDescription() +
            " | ImageUrl: " + this.getImageUrl() +
            " | PlayerMin: " + this.getNbPlayerMin() +
            " | PlayerMax: " + this.getNbPlayerMax() +
            " | TimeMin: " + this.getTimeToPlayMin() +
            " | TimeMax: " + this.getTimeToPlayMax() +
            " | Age: " + this.getAgeRecommended() +
            " | Complexity: " + this.getComplexity()
            + "\n";
    }

}

export default BaseGame;