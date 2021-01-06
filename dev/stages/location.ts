import { Game } from "../game";


interface LocationInterface {
    init: () => void;
    fillBackground: () => void;
    paintHeader: () => void;
}

export default class Location {
    game: Game;
    headingGradient: CanvasGradient;
    headingHeight: number;
    
    constructor(game: Game) {
        this.game = game;
        this.headingGradient = undefined;
        this.headingHeight = 60;
    }
    
    fillBackground() {
        let {backgroundContext: ctx, windowSize: {  width, height }} = this.game;
        ctx.beginPath();
        ctx.fillStyle = '#606fe4';
        ctx.fillRect(0, 0, width, height);
    }

    paintHeader() {
        let ctx = this.game.mainContext,
        height = this.headingHeight,
        width = this.game.windowSize.width;

        ctx.beginPath();
        
        ctx.fillStyle = this.headingGradient;
        ctx.shadowColor = '#3a4c8d';
        ctx.shadowOffsetY = 0;
        ctx.shadowBlur = 15;
        ctx.fillRect(0, 0, width, height);
    }


    init(){
        this.fillBackground(); 
        if(!this.headingGradient){
            let ctx = this.game.mainContext,
            gradient = ctx.createLinearGradient(0, 0, 0, this.headingHeight);
            gradient.addColorStop(0, '#6571dd');
            gradient.addColorStop(1, '#394d90');
            this.headingGradient = gradient;
        }
        this.game.clearMainCanvas();


        this.paintHeader();
    }
}