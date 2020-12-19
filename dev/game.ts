
interface GameInterface {
    canvasBackground: HTMLCanvasElement;
    canvasMain: HTMLCanvasElement;
    init: ()=> void;
    windowSize: {
        width: number;
        height: number;
    }
};


class Game implements GameInterface {
    canvasBackground: HTMLCanvasElement;
    canvasMain: HTMLCanvasElement;
    windowSize: {
        width: number;
        height: number;
    }

    constructor() {
        this.windowSize = {
            width: 0,
            height: 0
        }
    }


    init (): void{
        this.canvasBackground = document.querySelector('#canvas-bg');
        this.canvasMain = document.querySelector('#canvas-main');
        this.setFullSize();
    };

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
};




let game = new Game();
console.log(game);
game.init();
