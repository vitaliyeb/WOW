import { Game } from "../game";
import { InterfaceСountry } from "../levels";


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
    animateFrameId: number;
    scrolTop: number;
    heightVisibleDivision: number;
    cardBottomPadding: number;
    fullHeightLevels: number;
    locationActivePaths: Array<any>;
    cardSize: {
        width: number,
        height: number
    }
    
    constructor(game: Game) {
        this.game = game;
        this.headingGradient = undefined; 
        this.animateFrameId = undefined;
        this.headingHeight = 60;
        this.backPath = undefined;
        this.fullHeightLevels = undefined;
        this.scrolTop = 0;
        this.cardSize = {
            width: this.game.minMax(300, this.game.windowSize.width / 100 * 70, 500),
            height: 250
        };
        this.locationActivePaths = [];
        this.cardBottomPadding = 15;
        this.heightVisibleDivision = this.game.windowSize.height - this.headingHeight;
        this.mouseMove = this.mouseMove.bind(this);
        this.click = this.click.bind(this);
        this.scrollLocationCard = this.scrollLocationCard.bind(this);
        document.addEventListener('wheel', this.scrollLocationCard);
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
    };

    click(e: MouseEvent) {
        let { x, y} = this.game.getCursorPosition(e),
            ctx = this.game.mainContext;
        if(ctx.isPointInPath(this.backPath, x, y)){
            cancelAnimationFrame(this.animateFrameId);
            this.clearEventListeners();
            this.game.setStatus('globalMenu');
        }

    }

    scrollLocationCard(e: WheelEvent) {
        this.scrolTop+= e.deltaY / 7;
        if (this.scrolTop > 0) return this.scrolTop = 0;
        let diff = this.fullHeightLevels - (window.innerHeight - this.headingHeight);
        if ( diff < Math.abs(this.scrolTop) ) this.scrolTop = -diff;
    }

    clearEventListeners(): void {
        let screenWrapper = this.game.screenWrapper;
        screenWrapper.removeEventListener('mousemove', this.mouseMove);
        screenWrapper.removeEventListener('click', this.click);
        screenWrapper.style.cursor = 'default';
    }

    locationLoop(): void {
        this.game.clearMainCanvas();
        this.getVisibleCard();
        this.paintHeader();
        this.animateFrameId = requestAnimationFrame(()=>this.locationLoop());
    }

    getVisibleCard(): void{
        let top = this.scrolTop,
            heightVisibleDivision = this.heightVisibleDivision,
            headingHeight = this.headingHeight,
            paddingBottom = this.cardBottomPadding,
            cardHeight = this.cardSize.height,
            cards = this.game.user.levels.countries;    

        cards.reduce((lastY, el, ind) => {
            let y = lastY + (ind ? cardHeight + paddingBottom : headingHeight) + 5;
            this.paintCard(y, cardHeight, el);
            return y;
        }, top);
    }

    paintCard(y: number, cardHeight: number, el: InterfaceСountry): void{
        let ctx = this.game.mainContext,
            path = new Path2D(),
            x = (this.game.windowSize.width - this.cardSize.width) / 2, 
            width = this.cardSize.width,
            angleRadiusDivision = 15;

        path.moveTo(x + angleRadiusDivision, y);
        path.lineTo(x + width - angleRadiusDivision, y);
        path.quadraticCurveTo(x + width, y, x + width, y + angleRadiusDivision);
        path.lineTo(x + width, y + cardHeight - angleRadiusDivision); 
        path.quadraticCurveTo(x + width, y + cardHeight, x + width - angleRadiusDivision, y + cardHeight);
        path.lineTo(x + angleRadiusDivision, y + cardHeight); 
        path.quadraticCurveTo(x, y + cardHeight, x, y + cardHeight - angleRadiusDivision);
        path.lineTo(x, y + angleRadiusDivision); 
        path.quadraticCurveTo(x, y, x + angleRadiusDivision, y);


        ctx.beginPath();
        ctx.fillStyle = 'red';
        ctx.fill(path);
        ;
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

        if(!this.fullHeightLevels) this.fullHeightLevels = this.game.user.levels.countries.length * (this.cardSize.height + 20);
        if(!this.backPath) this.backPath = this.createBackPath();
        this.game.screenWrapper.addEventListener('mousemove', this.mouseMove);
        this.game.screenWrapper.addEventListener('click', this.click);
        this.locationLoop();
    }
}