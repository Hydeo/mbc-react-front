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
        return title == null ? "Unknown Title" : title;
    }

    getDescription(): string {
        let description = this.getLocalizedProperty("description");
        return description == null ? "" : description;
    }

    getImageUrl(): string {
        let imageUrl = this.getLocalizedProperty("imageUrl");
        return imageUrl == null ? "https://tof.cx/images/2020/05/04/b1aced89d62e6505d1f141655b5964e7.png" : imageUrl;
    }

    getLocalizedProperty(property: string): string {
        let gameLang = this.localization.hasOwnProperty(this.geti18nLang()) ? this.geti18nLang() : 'eng';
        if (this.localization[gameLang].hasOwnProperty(property)) {
            return this.localization[gameLang][property];
        }
        return "";
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