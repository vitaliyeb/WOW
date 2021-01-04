import { Game } from "../game";


interface LocationInterface {
    init: () => void;
    fillBackground: () => void;
}

export default class Location {
    game: Game;
    
    constructor(game: Game) {
        this.game = game;
    }
    
    fillBackground() {
        let {backgroundContext: ctx, windowSize: {  width, height }} = this.game;
        ctx.beginPath();
        ctx.fillStyle = '#606fe4';
        ctx.fillRect(0, 0, width, height);
    }



    init(){
        this.fillBackground(); 
        // this.game.clearMainCanvas();

    }
}