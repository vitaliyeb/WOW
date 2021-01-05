import { LoadingGame } from './stages/loadingGame'
import GlobalMenu from "./stages/globalMenu";
import Location from "./stages/location";
import {User} from "./user";



interface GameInterface {
    init: ()=> void;
    runInitScene: ()=> void;
    setBackground: (path: string, titleGame?: boolean) => void;
    setStatus: (status: string)=> void;
    clearMainCanvas: ()=> void;
    minMax: <T>(n: T, min: T, max: T )=> T;
    getCursorPosition: (e: MouseEvent) => {x: number, y: number}
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
    user: User;

    constructor() {
        this.canvasBackground = undefined;
        this.screenWrapper = undefined;
        this.canvasMain = undefined;
        this.backgroundContext = undefined;
        this.mainContext = undefined;
        this.location = undefined;
        this.user = undefined;
        this.windowSize = {
            width: 0,
            height: 0
        };
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
        this.user = new User(this);
        this.setFullSize();
        this.loadingGameStages = new LoadingGame(this);
        this.globalMenu = new GlobalMenu(this);
        this.location = new Location(this);
        this.runInitScene();
    };

    setStatus(status: string): void{
        this.status = status;
        this.runInitScene();
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

    runInitScene(): void{
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
        }
    }

    clearMainCanvas(): void {
        let ctx = this.mainContext;
        ctx.beginPath();
        ctx.clearRect(0, 0, this.windowSize.width, this.windowSize.height);
    }

    setBackground(path: string, titleGame?: boolean) {
        let img = new Image(),
        bgCtx = this.backgroundContext,
            {
                width,
                height
            } = this.windowSize;

        img.src = path;
        img.onload = () => {
            if (width >= height){
                bgCtx.drawImage(img, 0, 0, width, height*(width/height));
            }else {
                bgCtx.drawImage(img, 0, 0, width*(height/width), height);
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
        };
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