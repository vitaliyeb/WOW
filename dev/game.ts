import { LoadingGame } from './stages/loadingGame'



interface GameInterface {
    init: ()=> void;
    runInitScene: ()=> void;
};


class Game implements GameInterface {
    canvasBackground: HTMLCanvasElement;
    canvasMain: HTMLCanvasElement;
    status: string;
    windowSize: {
        width: number;
        height: number;
    };
    loadingGameStages: any;

    constructor() {
        this.canvasBackground = undefined;
        this.canvasMain = undefined;
        this.windowSize = {
            width: 0,
            height: 0
        };
        this.status = 'loadingTheGame',
        this.loadingGameStages = new LoadingGame(this);

    }

    init (): void{
        this.canvasBackground = document.querySelector('#canvas-bg');
        this.canvasMain = document.querySelector('#canvas-main');
        this.setFullSize();
        this.runInitScene();
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

    runInitScene(): void{
        switch (this.status){
            case 'loadingTheGame':
                this.loadingGameStages.init();
                break;
        }
    }
};

export {
    Game
}


let game = new Game();
// console.log(game);
game.init();
