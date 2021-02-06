import { Game } from '../game';
import { InterfaceSightHandler } from '../levels';

interface InterfaceGame {
    init: (data: InterfaceSightHandler)=> void
}


class Investigated {
    game: Game

    constructor(game: Game) {
        this.game = game;
    }

    init ( data: InterfaceSightHandler ) {

    }




}

export default Investigated;