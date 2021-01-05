import { Game } from "../game";


interface LocationInterface {
    init: () => void;
    fillBackground: () => void;
    paintHeader: () => void;
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

    paintHeader() {
        let ctx = this.game.mainContext,
        height = 60,
        width = this.game.windowSize.width;

        ctx.beginPath();
        
        ctx.fillStyle = "red";
        ctx.fillRect(0, 0, width, height);
        ctx.shadowColor = '#f8f9d6';
        ctx.shadowBlur = 5;
    }


    init(){
        this.fillBackground(); 
        this.game.clearMainCanvas();


        this.paintHeader();
    }
}