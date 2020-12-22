import { Game } from "../game";

interface InterfaceLoadingGame {
    init: ()=> void;
    loadingLoop: ()=> void;
}


class LoadingGame implements InterfaceLoadingGame{
    game: Game;

    constructor(game: Game) {
        this.game = game;
    }


    init():void {
        this.game.setBackground('./images/loadingBg.jpg');
        this.loadingLoop();
    }

    loadingLoop():void {
        requestAnimationFrame(()=>this.loadingLoop());
    }

}

export {
    LoadingGame
}