import { Game } from "../game";
import { InterfaceСountry } from "../levels";


interface LocationInterface {
    init: () => void;
    fillBackground: () => void;
    paintHeader: () => void;
    createBackPath: () => Path2D;
    createRect: (x: number, y: number, width: number, height: number, radius: number ) => Path2D;
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
            width: this.game.minMax(300, this.game.windowSize.width / 100 * 50, 500),
            height: 250
        };
        this.locationActivePaths = [];
        this.cardBottomPadding = 15;
        this.heightVisibleDivision = this.game.windowSize.height - this.headingHeight;
        this.mouseMove = this.mouseMove.bind(this);
        this.click = this.click.bind(this);
        this.scrollLocationCard = this.scrollLocationCard.bind(this);
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
            headingHeight = this.headingHeight,
            paddingBottom = this.cardBottomPadding,
            cardHeight = this.cardSize.height,
            cards = this.game.user.levels.countries,
            tMin = -cardHeight + headingHeight, 
            tMax = window.innerHeight;
          

        cards.reduce((lastY, el, ind) => {
            let y = lastY + (ind ? cardHeight + paddingBottom : headingHeight) + 5;
            if(y > tMax || y < tMin) return y ;
            
            this.paintCard(y, cardHeight, el);
            return y;
        }, top);
    }

    paintCard(y: number, cardHeight: number, el: InterfaceСountry): void{
        let ctx = this.game.mainContext,
            x = (this.game.windowSize.width - this.cardSize.width) / 2, 
            width = this.cardSize.width,
            angleRadiusDivision = 15,
            path = this.createRect(x, y, width, cardHeight, angleRadiusDivision);

        ctx.save();
        ctx.beginPath();

        ctx.clip(path);
        ctx.drawImage(this.game.imagesStore[el.imageName], x, y, width, cardHeight);
        ctx.restore();
    }


    createRect(x: number, y: number, width: number, height: number, radius: number ): Path2D{
        let path = new Path2D();

        path.moveTo(x + radius, y);
        path.lineTo(x + width - radius, y);
        path.quadraticCurveTo(x + width, y, x + width, y + radius);
        path.lineTo(x + width, y + height - radius); 
        path.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
        path.lineTo(x + radius, y + height); 
        path.quadraticCurveTo(x, y + height, x, y + height - radius);
        path.lineTo(x, y + radius); 
        path.quadraticCurveTo(x, y, x + radius, y);

        return path;
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
        document.addEventListener('wheel', this.scrollLocationCard);
        this.locationLoop();
    }
}