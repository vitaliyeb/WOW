import {Game} from "../game";


interface InterfaceGlobalMenu {
    init: ()=> void;
    menuLoop: ()=> void;
    createPathButtonPlay: ()=> Path2D;
    menuMouseMove: (e: MouseEvent)=> void;
    createPathLevelInfo: ()=> Path2D;
    createPathLocation: ()=> Path2D;
    paintLevelInfo: ()=> void;
    paintLocation: ()=> void;
    mainClick: (e: MouseEvent)=> void;
    locationIconOnClick: () => void;
}

export default class GlobalMenu {
    [propName: string]: any;
    game: Game;
    paths: {
        playButton: Path2D,
        levelInfo: Path2D,
        locationIcon: Path2D
    };
    textPlayParametrs: {
        bottom: number;
        left: number;
        fs: number
    };
    locationParams: {
        x: number,
        y: number,
        r: number,
        width: number,
        height: number
    }
    buttonPlayGradient: CanvasGradient;
    levelInfoGradient: CanvasGradient;
    locationImg: HTMLImageElement;

    constructor(game: Game) {
        this.game = game;
        this.buttonPlayGradient = undefined;
        this.levelInfoGradient = undefined;
        this.locationParams = {
            x: 0,
            y: 0,
            r: 0,
            width: 40,
            height: 40
        };
        this.textPlayParametrs = {
            bottom: 0,
            left: 0,
            fs: 0
        };
        this.locationImg = undefined;
        this.paths = {
            'playButton': undefined,
            'levelInfo': undefined,
            'locationIcon' : undefined
        };
        this.mainClick = this.mainClick.bind(this);
        this.menuMouseMove = this.menuMouseMove.bind(this);
    }

    init(): void {
        this.game.clearMainCanvas();
        this.game.setBackground('./images/loadingBg.jpg', true);
        if (!this.paths.playButton) this.paths.playButton = this.createPathButtonPlay();
        if (!this.paths.levelInfo) this.paths.levelInfo = this.createPathLevelInfo();
        if (!this.paths.locationIcon) this.paths.locationIcon = this.createPathLocation();
        this.game.screenWrapper.addEventListener('click', this.mainClick);
        this.game.screenWrapper.addEventListener('mousemove', this.menuMouseMove);
        this.menuLoop();
    }

    menuMouseMove(e: MouseEvent): void {
        let {
            mainContext,
            screenWrapper
        } = this.game,
        {x, y} = this.game.getCursorPosition(e);
        for (let [key, value] of Object.entries(this.paths)) {
            if (mainContext.isPointInPath(value, x, y)){
                screenWrapper.style.cursor = "pointer";
                break;
            } else {
                screenWrapper.style.cursor = "default";
            }
        }
    }

    mainClick(e: MouseEvent): void{
        let x: number = e.offsetX,
            y: number = e.offsetY,
            mainContext = this.game.mainContext;

        for (let [key, value] of Object.entries(this.paths)) {
            let keyClick: keyof GlobalMenu = key+'OnClick';
            if (mainContext.isPointInPath(value, x, y)) this[keyClick]();
        }
    }

    locationIconOnClick(): void{
        this.game.setStatus('location');
    }

    menuLoop(): void {
        if(this.game.status !== 'globalMenu') {
            let screenWrapper = this.game.screenWrapper;
            screenWrapper.removeEventListener('click', this.mainClick);
            screenWrapper.removeEventListener('mousemove', this.menuMouseMove);
            return;
        };
        this.game.clearMainCanvas();
        this.paintButtonPlay();
        this.paintLevelInfo();
        this.paintLocation();
        requestAnimationFrame(()=>this.menuLoop());
    }

    paintButtonPlay() {
        let ctx = this.game.mainContext,
            {left, bottom, fs} = this.textPlayParametrs;
        ctx.beginPath();
        ctx.fillStyle = this.buttonPlayGradient;
        ctx.fill(this.paths.playButton);

        ctx.beginPath();
        ctx.font = `500 ${fs}px Roboto`;
        ctx.textBaseline = 'middle';
        ctx.textAlign = 'center';
        ctx.fillStyle = "#fff";
        ctx.fillText('ИГРАТЬ', left, bottom);
    }

    createPathButtonPlay(): Path2D {
        let { width: windowWidth, height: windowHeight } = this.game.windowSize,
            width = this.game.minMax(windowWidth / 100 * 60, 300, 550),
            left = windowWidth / 2 - width / 2,
            height = this.game.minMax(windowHeight / 100 * 10, 45, 55),
            bottom = windowHeight / 100 * 70,
            angleDivision = height / 2,
            path = new Path2D();

        this.textPlayParametrs.bottom = bottom+4;
        this.textPlayParametrs.left = windowWidth / 2;
        this.textPlayParametrs.fs = height - 25;

        path.moveTo(left, bottom);
        path.quadraticCurveTo(left, bottom - angleDivision, left + angleDivision, bottom - angleDivision);
        path.lineTo(left + width - angleDivision , bottom - angleDivision);
        path.quadraticCurveTo(left + width, bottom - angleDivision, left + width, bottom);
        path.quadraticCurveTo(left + width, bottom + angleDivision, left + width - angleDivision, bottom + angleDivision);
        path.lineTo(left + angleDivision, bottom + angleDivision);
        path.quadraticCurveTo(left, bottom + angleDivision, left, bottom);

        let linearGradient = this.game.mainContext.createLinearGradient(left, bottom, left + width, bottom);
        linearGradient.addColorStop(0, '#f46a49');
        linearGradient.addColorStop(1, '#f652a8');
        this.buttonPlayGradient = linearGradient;

        return path;
    }

    createPathLevelInfo(): Path2D{
        let path = new Path2D(),
            ctx = this.game.mainContext,
            { width: windowWidth, height: windowHeight } = this.game.windowSize,
            radius = this.game.minMax(Math.min(windowWidth, windowHeight) / 100 * 10, 100, 140),
            left = windowWidth / 2,
            bottom = windowHeight / 100 * 45;

        let gradient = ctx.createLinearGradient(left + radius, bottom - radius, left + radius, bottom + radius );
        gradient.addColorStop(0, '#697af3');
        gradient.addColorStop(1, '#7d42d1');

        this.levelInfoGradient= gradient;

        path.arc(left, bottom, radius, 0, Math.PI * 2);

        return path;
    }

    createPathLocation(): Path2D{
        let path = new Path2D,
            {width} = this.game.windowSize,
            x = width - 60,
            y = 20,
            r = 20;
        path.arc(x + r, y + r, r, 0, Math.PI  *  2);  

        this.locationParams.x = x;
        this.locationParams.y = y;
        this.locationParams.r = r;

        this.locationImg = new Image(this.locationParams.width, this.locationParams.height);
        this.locationImg.src = './images/location.png'
        
        return path;
    }

    paintLocation(): void{
        let ctx = this.game.mainContext,
            {x, y, width, height} = this.locationParams,
            img = this.locationImg;
        ctx.beginPath();
        ctx.fillStyle = 'transparent';
        ctx.fill(this.paths.locationIcon);
        ctx.beginPath();
        
        ctx.drawImage(img, x, y, width, height);
    }

    paintLevelInfo(): void{
        let levelInfo = this.paths.levelInfo,
            ctx = this.game.mainContext;

        ctx.save();
        ctx.beginPath();
        ctx.shadowColor = '#f8f9d6';
        ctx.shadowBlur = 50;
        ctx.fillStyle = this.levelInfoGradient;
        ctx.fill(levelInfo);
        ctx.restore();

    }
}