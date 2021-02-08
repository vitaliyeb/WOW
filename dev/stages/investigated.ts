import { Game } from '../game';
import { InterfaceSightHandler } from '../levels';

interface InterfaceGame {
    init: (data: InterfaceSightHandler)=> void;
    drawText: () => void;
    drawArrow: () => void;
    mouseMoveHandler: (e: MouseEvent) => void;
    separationTextInStroke: (text: string) => void;
}


class Investigated {
    game: Game;
    imageBg: HTMLImageElement;
    heading: string;
    description: string;
    backPath: Path2D;


    constructor(game: Game) {
        this.game = game;
        this.imageBg = null;
        this.backPath = null;

        this.mouseMoveHandler = this.mouseMoveHandler.bind(this);
    }

    init ( {img, heading, description}: InterfaceSightHandler ) {
        this.imageBg = this.game.imagesStore[img];  
        this.heading = heading;
        this.description = description;  
        
        this.game.setBackground('gizaBg');
        this.game.clearMainCanvas();
        this.drawText();
        this.drawArrow();
        document.addEventListener('mousemove', this.mouseMoveHandler)
    }

    mouseMoveHandler(e: MouseEvent) {
        let {x, y} = this.game.getCursorPosition(e),
        ctx = this.game.mainContext,
        screenWrapper = this.game.screenWrapper;
        
        if(ctx.isPointInStroke(this.backPath, x, y)) return screenWrapper.style.cursor = 'pointer';
        screenWrapper.style.cursor = 'default';
    }

    drawText() {
        let ctx = this.game.mainContext,
            { heading, description } = this,
            { height, width } = this.game.windowSize,
            division = height / 100,
            left = width / 2,
            maxWidthText = width / 100 * 85,
            fsHeading = this.game.minMax(width / 100 * 5, 28, 48),
            fsDescription = this.game.minMax(width / 100 * 3, 28, 34),
            testText = 'sadasdsad asdsadsad sadsadasd asdsadasdasd asd asdsad asdasdasdasdsad adsadadasd adasdasd da ' + description;



        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillStyle = '#fff';    
        ctx.font = `${fsHeading}px Roboto`;
        ctx.fillText(heading, left, division * 80, maxWidthText);
        ctx.font = `${fsDescription}px Roboto`;
        this.separationTextInStroke(testText);
        ctx.fillText(testText, left, division * 85, maxWidthText);
    }

    drawArrow() {
        let path = new Path2D(),
        ctx = this.game.mainContext,
        top = 20,
        left = 25,
        width = 20,
        height = 30;

        ctx.lineWidth = 7;
        ctx.strokeStyle = '#fff';
        ctx.lineCap = 'round';

        path.moveTo(left + width, top);
        path.lineTo(left, top + height / 2);
        path.lineTo(left + width, top + height);
        ctx.stroke(path);
        
        this.backPath = path;
    }

    separationTextInStroke(str: string) {
        let ctx = this.game.mainContext,
            maxWidth = this.game.windowSize.width / 100 * 90,
            dataText = ctx.measureText(str);

        console.log(dataText)
    }

}

export default Investigated;