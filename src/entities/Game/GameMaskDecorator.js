//@flow
import BaseGameDecorator from './BaseGameDecorator';
import BaseGame from './BaseGame';
import Game from './Game';
import TagEntity from '../Tag';
import { conf_dev } from "../../config";
class GameMaskDecorator extends BaseGameDecorator {

    override: BaseGame;

    constructor(baseGame: BaseGame, override : BaseGame) {
        super(baseGame);
        this.loadOverride(override)
    }


    loadOverride(o : BaseGame) {
        var tagArray = [];
        o.tags.forEach((v,i)=>{
            tagArray.push(new TagEntity(v._id));
        })
        this.override = new Game(
            o._id,
            o.nb_player_min,
            o.nb_player_max,
            o.time_to_play_min,
            o.time_to_play_max,
            o.age_recommended,
            o.complexity,
            tagArray,
            o.localization
        )
    }

    getId(): string {
        return this.baseGame.getId();
    }

    getTags() : Array < TagEntity>{
        return this.override.tags;
    }

    getNbPlayerMin(): number {
        if (this.override.getNbPlayerMin() != null) {
            return this.override.getNbPlayerMin();
        }
        return this.baseGame.getNbPlayerMin();
    }

    getNbPlayerMax(): number {
        if (this.override.getNbPlayerMax() != null) {
            return this.override.getNbPlayerMax();
        }
        return this.baseGame.getNbPlayerMax();
    }

    getTimeToPlayMin(): number {
        if (this.override.getTimeToPlayMin() != null) {
            return this.override.getTimeToPlayMin();
        }
        return this.baseGame.getTimeToPlayMin();
    }

    getTimeToPlayMax(): number {
        if (this.override.getTimeToPlayMax() != null) {
            return this.override.getTimeToPlayMax();
        }

        return this.baseGame.getTimeToPlayMax();
    }

    getAgeRecommended(): number {
        if (this.override.getAgeRecommended() != null) {
            return this.override.getAgeRecommended();
        }
        return this.baseGame.getAgeRecommended();
    }

    getComplexity(): number {
        if (this.override.getComplexity() != null) {
            return this.override.getComplexity();
        }
        return this.baseGame.getComplexity();
    }


    getTitle() {
        if (this.override.getTitle()) {
            return this.override.getTitle();
        } else {
            return this.baseGame.getTitle();
        }
    }

    getDescription() {
        if (this.override.getDescription() != null) {
            return this.override.getDescription();
        } else {
            return this.baseGame.getDescription();
        }
    }

    getImageUrl() {
        if (this.override.getImageUrl() != null && this.override.getImageUrl() != conf_dev.url_fallback_img) {
            return this.override.getImageUrl();
        } else {
            return this.baseGame.getImageUrl();
        }
    }

    toString(): string{
    	return this.baseGame.toString()
    	+ "\nOverride:\n"
    	+ this.override.toString()
    	+"\n";
    }

}

export default GameMaskDecorator;