import {Game} from "../game";


interface InterfaceGlobalMenu {
    init: ()=> void;
    clearMainCanvas: ()=> Path2D;
}

export default class GlobalMenu {
    game: Game
    paths: Array<object>;

    constructor(game: Game) {
        this.game = game;
        this.paths = [];
    }

    init(): void {
        this.game.clearMainCanvas();
        this.createPathButtonPlay()
    }

    createPathButtonPlay(): Path2D {
        let ctx = this.game.mainContext,
            { width: windowWidth, height: windowHeight } = this.game.windowSize;
        console.log(windowWidth, windowHeight)



        return new Path2D();
    }

}