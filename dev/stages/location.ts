import { Game } from "../game";
import { InterfaceСountry, InterfaceSights } from "../levels";


interface LocationInterface {
    init: () => void;
    fillBackground: () => void;
    paintHeader: () => void;
    createBackPath: () => Path2D;
}

interface EventHandlersInterface {
    [propName : string] : any 
}

interface InterfaceSectionStatusIcons {
    [statusName: string]: string
}

export default class Location {
    game: Game;
    headingGradient: CanvasGradient;
    headingHeight: number;
    backPath: Path2D;
    animateFrameId: number;
    scrolTop: number;
    cursorPosition: {
        x: number,
        y: number
    };
    sectionStatusIcons :InterfaceSectionStatusIcons;
    heightVisibleDivision: number;
    eventStore: Array<EventHandlersInterface>;
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
        this.eventStore = [];
        this.sectionStatusIcons = {
            'done': 'check',
            'process': 'searchIcon',
            'block': 'lockIcon'
        };
        this.cardSize = {
            width: this.game.minMax(300, this.game.windowSize.width / 100 * 50, 500),
            height: 250
        };
        this.cursorPosition = {
            x: 0,
            y: 0
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
        this.game.mainContext.lineWidth = 7;
        path.moveTo(35, 15);
        path.lineTo(20, 30);
        path.lineTo(35, 45);
        return path;
    }

    mouseMove(e: MouseEvent){
        let {x, y} = this.game.getCursorPosition(e);
        this.cursorPosition.x = x; 
        this.cursorPosition.y = y;
    };

    click(e: MouseEvent) {
        let { x, y} = this.game.getCursorPosition(e),
            ctx = this.game.mainContext;
        if(ctx.isPointInStroke(this.backPath, x, y)){
            cancelAnimationFrame(this.animateFrameId);
            this.clearEventListeners();
            return this.game.setStatus('globalMenu');
        };
        let suitablePath = this.eventStore.filter(item=>ctx.isPointInPath(item.path, x, y)).shift();
        suitablePath?.handler();
    }

    scrollLocationCard(e: WheelEvent) {
        this.scrolTop+= e.deltaY / 7;
        if (this.scrolTop > 0) return this.scrolTop = 0;
        let diff = this.fullHeightLevels - (window.innerHeight - this.headingHeight);       
        if ( diff < Math.abs(this.scrolTop) ) this.scrolTop = -diff;
    }

    clearEventListeners(): void {
        this.eventStore = [];
        let screenWrapper = this.game.screenWrapper;
        screenWrapper.removeEventListener('mousemove', this.mouseMove);
        screenWrapper.removeEventListener('click', this.click);
        screenWrapper.style.cursor = 'default';
    }

    checkPathInCursorPosition(x: number, y: number) {
        let ctx = this.game.mainContext,
        screenWrapper = this.game.screenWrapper;

        if(ctx.isPointInStroke(this.backPath, x, y)) return screenWrapper.style.cursor = "pointer";
        if(this.eventStore.some((el) => ctx.isPointInPath(el.path, x, y))) return screenWrapper.style.cursor = "pointer";
        screenWrapper.style.cursor = "default";
    }

    locationLoop(): void {
        this.eventStore = [];
        this.game.clearMainCanvas();
        this.getVisibleCard();
        this.paintHeader();
        this.checkPathInCursorPosition(this.cursorPosition.x, this.cursorPosition.y);
        this.animateFrameId = requestAnimationFrame(()=>this.locationLoop());
    }

    getVisibleCard(): void{
        let top = this.scrolTop,
            headingHeight = this.headingHeight,
            paddingBottom = this.cardBottomPadding,
            cardHeight = this.cardSize.height,
            cards = this.game.user.levels.countries,
            tMin = -cardHeight + headingHeight, 
            tMax = window.innerHeight,
            x = (this.game.windowSize.width - this.cardSize.width) / 2;
          
        cards.reduce((lastY, el, ind) => {
            let y = lastY + (ind ? cardHeight + paddingBottom : headingHeight) + 5;
            if(y > tMax || y < tMin) return y ;

            this.paintCard(y, x, cardHeight, el);

            return y;
        }, top);
    }

    paintCard(y: number, x: number, cardHeight: number, el: InterfaceСountry): void{
        let ctx = this.game.mainContext,
            width = this.cardSize.width,
            angleRadiusDivision = 15,
            path = this.game.createRect(x, y, width, cardHeight, angleRadiusDivision),
            isBlock = el.status === 'block',
            cardTitle = isBlock ? 'НЕ ИЗУЧЕНО' : el.country;

        ctx.save();
        ctx.beginPath();

        ctx.clip(path);
        ctx.drawImage(this.game.imagesStore[el.imageName], x, y, width, cardHeight);

        if(isBlock){
            let questionW = 60,
                questionH = 80;
            ctx.fillStyle = "#535353e6";
            ctx.fillRect(0, 0, this.game.windowSize.width, this.game.windowSize.height);
            ctx.drawImage(this.game.imagesStore.questoin, x + (width / 2) - (questionW / 2), y + (cardHeight / 2) - (questionH / 2), questionW, questionH);
        }
        
        if(!isBlock) this.paintSections(y, x + 10, el);
        
        ctx.fillStyle = "#fff";
        ctx.font = "22px roboto";
        ctx.textBaseline = "bottom";
        ctx.textAlign = "left";
        ctx.fillText(cardTitle, x + 20, y + cardHeight - 10);

        if(el.status === "done"){
            let doneW = 30,
                doneH = 30;
            ctx.drawImage(this.game.imagesStore.checkGreen, x + width - 10 - doneW, y + cardHeight - 10 - doneH, doneW, doneH );
        }

        if(el.status === 'process'){
            this.eventStore.push({
                path,
                handler: () => {
                    cancelAnimationFrame(this.animateFrameId);
                    this.clearEventListeners();
                    this.game.setStatus('game');
                }
            });            
        }

        ctx.restore();
    }

    paintSections(y: number, x: number, country: InterfaceСountry ): void{
        let ctx = this.game.mainContext,
            { sectionStatusIcons } = this,
            height = 25,
            width = 130,
            margin = 10,
            iconWidth = 12,
            iconHeight = 12;

        ctx.font = "11px roboto";
        ctx.textAlign = 'left';
        ctx.textBaseline = "middle";
        country.sights.reduce((lastY, sight)=>{
            let path = this.game.createRect(x + margin, lastY, width, height, height /2);
            ctx.fillStyle = '#ea5c01';
            ctx.fill(path);
            ctx.fillStyle = '#fff';
            ctx.fillText(sight.title, x + margin + 10, lastY + height / 2, width - 40);
            let icon = this.game.imagesStore[sectionStatusIcons[sight.status]];
            ctx.drawImage(icon, x + margin + width - iconWidth - 10, lastY + (height - iconHeight) / 2, iconWidth, iconHeight);
            this.eventStore.push({
                path: path,
                handler: this.handlerSectionClick(sight)
            });

            return lastY + height + margin;
        }, y + 20);
    }

    handlerSectionClick({status, handler}: InterfaceSights) {
        return () => {
            if (status === 'block') return;
            cancelAnimationFrame(this.animateFrameId);
            this.clearEventListeners();
            this.game.setStatus(status === "process" ? 'game' : 'investigated', handler);
        };
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