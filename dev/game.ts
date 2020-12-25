import { LoadingGame } from './stages/loadingGame'
import GlobalMenu from "./stages/globalMenu";



interface GameInterface {
    init: ()=> void;
    runInitScene: ()=> void;
    setBackground: (path: string) => void;
    setStatus: (status: string)=> void;
    clearMainCanvas: ()=> void;
    minMax: <T>(n: T, min: T, max: T )=> T;
    setMouseMoveHandler: (f: (o: {x: number, y: number})=>any)=> void;
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

    constructor() {
        this.canvasBackground = undefined;
        this.screenWrapper = undefined;
        this.canvasMain = undefined;
        this.backgroundContext = undefined;
        this.mainContext = undefined;
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
        this.setFullSize();
        this.loadingGameStages = new LoadingGame(this);
        this.globalMenu = new GlobalMenu(this);
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
        }
    }

    clearMainCanvas(): void {
        let ctx = this.mainContext;
        ctx.beginPath();
        ctx.clearRect(0, 0, this.windowSize.width, this.windowSize.height);
    }

    setBackground(path: string) {
        let img = new Image();
        img.src = path;
        img.onload = () => {
            let bgCtx = this.backgroundContext,
                {
                    width,
                    height
                } = this.windowSize;
            if (width >= height){
                bgCtx.drawImage(img, 0, 0, width, height*(width/height));
            }else {
                bgCtx.drawImage(img, 0, 0, width*(height/width), height);
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

    setMouseMoveHandler(f: (o: {x: number, y: number})=>any): void{
        this.screenWrapper.addEventListener("mousemove", (e: MouseEvent)=>f(this.getCursorPosition(e)));
    }
};

export {
    Game
}

window.addEventListener('load', function() {
    let game = new Game();
    game.init();
}, false);