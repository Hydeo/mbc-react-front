//@flow
import BaseGame from './BaseGame';

class BaseGameDecorator extends BaseGame {

    baseGame: BaseGame

    constructor(baseGame: BaseGame) {
        super();
        this.baseGame = baseGame;
    }

    getId(): string {
        return this.baseGame.getId();
    }

    getNbPlayerMin(): number {
        return this.baseGame.getNbPlayerMin();
    }

    getNbPlayerMax(): number {
        return this.baseGame.getNbPlayerMax();
    }

    getTimeToPlayMin(): number {
        return this.baseGame.getTimeToPlayMin();
    }
    
    getTimeToPlayMax(): number {
        return this.baseGame.getTimeToPlayMax();
    }

    getAgeRecommended(): number {
        return this.baseGame.getAgeRecommended();
    }

    getComplexity(): number {
        return this.baseGame.getComplexity();
    }

    getTitle(): string {
        return this.baseGame.getTitle();
    }

    getDescription(): string {
        return this.baseGame.getDescription();
    }

    getImageUrl(): string {
        return this.baseGame.getImageUrl();
    }



}

export default BaseGameDecorator;