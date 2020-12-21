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

        this.loadingLoop();
    }

    loadingLoop():void {
        console.log('s')
        requestAnimationFrame(()=>this.loadingLoop());
    }

}

export {
    LoadingGame
}