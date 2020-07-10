//@flow
import BaseGameDecorator from './BaseGameDecorator';
import BaseGame from './BaseGame';
import Game from './Game';

class GameMaskDecorator extends BaseGameDecorator {

    baseGame: BaseGame;

    constructor(baseGame: BaseGame, override : BaseGame) {
        super(baseGame);
        this.loadOverride(override)
    }


    loadOverride(o : BaseGame) {
        this.baseGame = new Game(
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
        if (this.baseGame.getNbPlayerMin() != null) {
            return this.baseGame.getNbPlayerMin();
        }
        return this.baseGame.getNbPlayerMin();
    }

    getNbPlayerMax(): number {
        if (this.baseGame.getNbPlayerMax() != null) {
            return this.baseGame.getNbPlayerMax();
        }
        return this.baseGame.getNbPlayerMax();
    }

    getTimeToPlayMin(): number {
        if (this.baseGame.getTimeToPlayMin() != null) {
            return this.baseGame.getTimeToPlayMin();
        }
        return this.baseGame.getTimeToPlayMin();
    }

    getTimeToPlayMax(): number {
        if (this.baseGame.getTimeToPlayMax() != null) {
            return this.baseGame.getTimeToPlayMax();
        }

        return this.baseGame.getTimeToPlayMax();
    }

    getAgeRecommended(): number {
        if (this.baseGame.getAgeRecommended() != null) {
            return this.baseGame.getAgeRecommended();
        }
        return this.baseGame.getAgeRecommended();
    }

    getComplexity(): number {
        if (this.baseGame.getComplexity() != null) {
            return this.baseGame.getComplexity();
        }
        return this.baseGame.getComplexity();
    }


    getTitle() {
        if (this.baseGame.getTitle() != null) {
            return this.baseGame.getTitle();
        } else {
            return this.baseGame.getTitle();
        }
    }

    getDescription() {
        if (this.baseGame.getDescription() != null) {
            return this.baseGame.getDescription();
        } else {
            return this.baseGame.getDescription();
        }
    }

    getImageUrl() {
        if (this.baseGame.getImageUrl() != null) {
            return this.baseGame.getImageUrl();
        } else {
            return this.baseGame.getImageUrl();
        }
    }

    toString(): string{
    	return this.baseGame.toString()
    	+ "\nOverride:\n"
    	+ this.baseGame.toString()
    	+"\n";
    }

}

export default GameMaskDecorator;