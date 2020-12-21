import { Game } from "../game";

interface InterfaceLoadingGame {
    init: ()=> void;
    loadingLoop: ()=> void;
    setBackground: () => void;
}


class LoadingGame implements InterfaceLoadingGame{
    game: Game;
    imageBackground: HTMLImageElement;

    constructor(game: Game) {
        this.game = game;
        this.imageBackground = new Image();

    }

    setBackground() {
        let img = this.imageBackground;
        img.src = './images/loadingBg.jpg';
        img.onload = () => {
            let bgCtx = this.game.backgroundContext,
                {
                    width,
                    height
                } = this.game.windowSize;
            bgCtx.drawImage(img, 0, 0, width, height*1.5);
        };
    }

    init():void {
        this.setBackground();
        this.loadingLoop();
    }

    loadingLoop():void {
        console.log('s')
        requestAnimationFrame(()=>this.loadingLoop());
    }

}

export {
    LoadingGame
}