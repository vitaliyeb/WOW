import { LoadingGame } from './stages/loadingGame'
import GlobalMenu from "./stages/globalMenu";
import GamePlay from "./stages/gamePlay";
import Location from "./stages/location";
import Investigated from './stages/investigated';
import {User} from "./user";
import EndOfLevel from "./stages/endOfLevel";



interface GameInterface {
    init: ()=> void;
    runInitScene: (arg: Array<any>)=> void;
    setBackground: (imageId: string, titleGame?: boolean) => void;
    setStatus: (status: string)=> void;
    clearMainCanvas: ()=> void;
    paintPreloader: () => void
    minMax: <T>(n: T, min: T, max: T )=> T;
    getCursorPosition: (e: MouseEvent) => {x: number, y: number};
    loadImages: (url: string, name: string) => Promise<HTMLImageElement>;
    createRect: (x: number, y: number, width: number, height: number, radius: number ) => Path2D;
};


class Game implements GameInterface {
    screenWrapper: HTMLDivElement;
    canvasBackground: HTMLCanvasElement;
    canvasMain: HTMLCanvasElement;
    backgroundContext: CanvasRenderingContext2D;
    mainContext: CanvasRenderingContext2D;
    status: string;
    windowSize: {
        width: number;
        height: number;
    };
    loadingGameStages: LoadingGame;
    globalMenu: GlobalMenu;
    location: Location;
    investigated: Investigated;
    user: User;
    gamePlay: GamePlay
    endOfLevel: EndOfLevel;
    imagesStore: {
        [propName: string]: HTMLImageElement;
    };

    constructor() {
        this.canvasBackground = undefined;
        this.screenWrapper = undefined;
        this.investigated = undefined;
        this.canvasMain = undefined;
        this.backgroundContext = undefined;
        this.mainContext = undefined;
        this.location = undefined;
        this.user = undefined;
        this.windowSize = {
            width: 0,
            height: 0
        };
        this.imagesStore = {};
        this.status = 'loadingTheGame',
        this.loadingGameStages = undefined;
        this.globalMenu = undefined;
    }

    init (): void{
        this.canvasBackground = document.querySelector('#canvas-bg');
        this.canvasMain = document.querySelector('#canvas-main');
        this.backgroundContext = this.canvasBackground.getContext('2d');
        this.mainContext = this.canvasMain.getContext('2d');
        this.screenWrapper = document.querySelector('.screen');
        this.investigated = new Investigated(this);
        this.user = new User(this);
        this.endOfLevel = new EndOfLevel(this);
        this.setFullSize();
        this.loadingGameStages = new LoadingGame(this);
        this.globalMenu = new GlobalMenu(this);
        this.location = new Location(this);
        this.gamePlay = new GamePlay(this);
        this.paintPreloader();  
    };

    paintPreloader() {
        let ctx = this.backgroundContext,
        { width, height } = this.windowSize;

        ctx.fillStyle = '#ff9800';
        ctx.fillRect(0, 0, width, height);
        ctx.font = `${this.minMax(width / 20, 24, 38)}px cursive`;
        ctx.textBaseline = 'middle'
        ctx.textAlign = 'center';
        ctx.fillStyle = '#fff';
        ctx.fillText('VITALIYEB GAMES', width / 2, height / 2);

        Promise.all([
            this.loadImages('./images/loadingBg.jpg', 'mainBg'),
            new Promise((res, rej) => setTimeout(res, 1000))
        ]).then(() => this.runInitScene())
    }

    setStatus(status: string, ...arg: any): void{
        this.status = status;
        this.runInitScene(arg);
    }

    setFullSize(): void{
        let screenElement = <HTMLDivElement>document.querySelector('.screen'),
            width: number = screenElement.clientWidth,
            height: number = screenElement.clientHeight;
        this.windowSize.width = width;
        this.windowSize.height = height;

        for (let canvasElement of [this.canvasBackground, this.canvasMain]){
            canvasElement.width = width;
            canvasElement.height = height;
        }
    }

    runInitScene(arg?: any[]): void{
        switch (this.status){
            case 'loadingTheGame':
                this.loadingGameStages.init();
                break;
            case 'globalMenu':
                this.globalMenu.init();
                break;
            case 'location':
                this.location.init();
                break;   
            case 'investigated':
                this.investigated.init(arg[0]);
                break;
            case 'game':
                this.gamePlay.init();
            case 'endOfLevel':
                this.endOfLevel.init();
                break;
        }
    }

    clearMainCanvas(): void {
        let ctx = this.mainContext;
        ctx.beginPath();
        ctx.clearRect(0, 0, this.windowSize.width, this.windowSize.height);
    }

    loadImages(url: string, name: string): Promise<HTMLImageElement> {
        let htmlImgElement: HTMLImageElement = new Image(1000, 1000);
        return new Promise((res, rej)=> {
            htmlImgElement.src = url;
            htmlImgElement.onload = () => {
                this.imagesStore[name] = htmlImgElement;
                return res(htmlImgElement);
            }
        });
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
    

    async setBackground(imageId: string, titleGame?: boolean) {
        let bgCtx = this.backgroundContext,
            {
                width,
                height
            } = this.windowSize,
            image = this.imagesStore[imageId];
            
        if (width >= height){
            bgCtx.drawImage(image, 0, 0, width, height*(width/height));
        }else {
            bgCtx.drawImage(image, 0, 0, width*(height/width), height);
        }
        if (titleGame){
            let left = width / 2,
                top = height / 100 * 15;
            bgCtx.beginPath();
            bgCtx.font = `500 40px Roboto`;
            bgCtx.textBaseline = 'middle';
            bgCtx.textAlign = 'center';
            bgCtx.fillStyle = "#fff";
            bgCtx.fillText('Words of wonders', left, top);
        }
    }

    getCursorPosition(e: MouseEvent): {x: number, y: number} {
        return {
            x: e.offsetX,
            y: e.offsetY
        }
    }

    minMax<T>(n: T, min: T, max: T): T {
        if (n > min && max > n) return n;
        if (n > max) return max;
        if (n < min) return min;
    }
};

export {
    Game
}

window.addEventListener('load', function() {
    let game = new Game();
    game.init();
}, false);