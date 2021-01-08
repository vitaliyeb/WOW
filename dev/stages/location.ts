import { Game } from "../game";


interface LocationInterface {
    init: () => void;
    fillBackground: () => void;
    paintHeader: () => void;
    createBackPath: () => Path2D;
}

export default class Location {
    game: Game;
    headingGradient: CanvasGradient;
    headingHeight: number;
    backPath: Path2D;
    
    constructor(game: Game) {
        this.game = game;
        this.headingGradient = undefined;
        this.headingHeight = 60;
        this.backPath = undefined;
        this.mouseMove = this.mouseMove.bind(this);
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
        ctx.save();
        ctx.beginPath();
        
        ctx.fillStyle = this.headingGradient;
        ctx.shadowColor = '#3a4c8d';
        ctx.shadowOffsetY = 0;
        ctx.shadowBlur = 15;
        ctx.fillRect(0, 0, width, height);

        ctx.font = `500 24px Roboto`;
        ctx.textBaseline = 'middle';
        ctx.textAlign = 'center';
        ctx.fillStyle = "#fff";
        ctx.fillText('ИССЛЕДОВАТЬ', this.game.windowSize.width / 2, this.headingHeight / 2);

        ctx.beginPath();
        ctx.lineWidth = 5;
        ctx.lineCap = 'round';
        ctx.strokeStyle = "#fff";
        ctx.stroke(this.backPath);
        ctx.restore();
    }

    createBackPath(): Path2D{
        let path = new Path2D();
        path.moveTo(35, 15);
        path.lineTo(20, 30);
        path.lineTo(35, 45);
        return path;
    }

    mouseMove(e: MouseEvent){
        let {x, y} = this.game.getCursorPosition(e),
            ctx = this.game.mainContext,
            screenWrapper = this.game.screenWrapper;

        screenWrapper.style.cursor = ctx.isPointInPath(this.backPath, x, y) ? "pointer" : "default";
        
        
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
        if(!this.backPath) this.backPath = this.createBackPath();
        this.game.clearMainCanvas();
        this.game.screenWrapper.addEventListener('mousemove', this.mouseMove);


        this.paintHeader();
    }
}