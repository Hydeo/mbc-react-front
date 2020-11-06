// @flow
import TagEntity from '../Tag/Tag';
import i18n from "i18next";
import { conf_dev } from "../../config";

class BaseGame {

    id: string
    nbPlayerMin: number;
    nbPlayerMax: number;
    timeToPlayMin: number;
    timeToPlayMax: number;
    ageRecommended: number;
    complexity: number;
    tags: Array < TagEntity > ;
    localizations: {
        [string] /*lang*/: {
            "title": string,
            "description": string,
            "imageUrl": string
        }
    }

    constructor() {
        this.id = 
        this.nbPlayerMin = 
        this.nbPlayerMax = 
        this.timeToPlayMin = 
        this.timeToPlayMax = 
        this.ageRecommended = 
        this.complexity = 
        this.tags = 
        this.localizations = null;
    }

    getId(): string {
        return this.id;
    }

    getTags() : Array < TagEntity>{
        return this.tags;
    }

    getNbPlayerMin(): number {
        return this.nbPlayerMin;
    }

    getNbPlayerMax(): number {
        return this.nbPlayerMax;
    }

    getTimeToPlayMin(): number {
        return this.timeToPlayMin;
    }
    getTimeToPlayMax(): number {
        return this.timeToPlayMax;
    }

    getAgeRecommended(): number {
        return this.ageRecommended;
    }

    getComplexity(): number {
        return this.complexity;
    }

    getTitle(): string {
        return this.getLocalizedProperty("title");
    }

    getDescription(): string {
        return  this.getLocalizedProperty("description");
    }

    getImageUrl(): string {
        return this.getLocalizedProperty("imageUrl") ? this.getLocalizedProperty("imageUrl") : conf_dev.url_fallback_img ;
    }

    getLocalizedProperty(property: string): string {
        if(this.localizations != null){
            let gameLang = this.localizations.hasOwnProperty(this.geti18nLang()) ? this.geti18nLang() : 'eng';
            if (this.localizations[gameLang].hasOwnProperty(property)) {
                return this.localizations[gameLang][property];
            }
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