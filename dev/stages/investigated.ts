import { Game } from '../game';
import { InterfaceSightHandler } from '../levels';

interface InterfaceGame {
    init: (data: InterfaceSightHandler)=> void
}


class Investigated {
    game: Game;
    imageBg: HTMLImageElement;
    heading: string;
    description: string;


    constructor(game: Game) {
        this.game = game;
        this.imageBg = null;
    }

    init ( {img, heading, description}: InterfaceSightHandler ) {
        this.imageBg = this.game.imagesStore[img];    
        
        
    }




}

export default Investigated;