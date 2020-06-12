//@flow
import BaseGameDecorator from './BaseGameDecorator';
import BaseGame from './BaseGame';
import Game from './Game';

class GameMaskDecorator extends BaseGameDecorator {

    override: BaseGame;

    constructor(baseGame: BaseGame, override) {
        super(baseGame);
        this.loadOverride(override)
    }


    loadOverride(o): BaseGame {
        this.override = new Game(
            o._id,
            o.nb_player_min,
            o.nb_player_max,
            o.time_to_play_min,
            o.time_to_play_max,
            o.age_recommended,
            o.complexity,
            o.tags,
            o.localization
        )
    }

    getId(): string {
        return this.baseGame.getId();
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
        if (this.override.getTitle() != null) {
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
        if (this.override.getImageUrl() != null) {
            return this.override.getImageUrl();
        } else {
            return this.baseGame.getImageUrl();
        }
    }

}

export default GameMaskDecorator;