import { Game } from "../game";

interface InterfaceLoadingGame {
    init: ()=> void;
    loadingLoop: ()=> void;
    paintLoading: ()=> void;
    paintRectangleBorderRadius: ()=> void;
}


class LoadingGame implements InterfaceLoadingGame{
    game: Game;
    loadingDrawParametrs: {
        bottom: number,
        width: number,
        left: number,
        lineThickness: number,
        strokeWidth: number
    };


    constructor(game: Game) {
        this.game = game;
        this.loadingDrawParametrs = {
            bottom: game.windowSize.height - game.windowSize.height / 100 * 17,
            width: game.windowSize.width / 100 * 80,
            left: game.windowSize.width / 100 * 10,
            lineThickness: 10,
            strokeWidth: 2
        }
    }


    init():void {
        this.game.setBackground('./images/loadingBg.jpg');
        this.paintLoading();
        // this.loadingLoop();
    }

    paintLoading(): void{
        this.paintRectangleBorderRadius();

    }

    loadingLoop():void {
        requestAnimationFrame(()=>this.loadingLoop());
    }

    paintRectangleBorderRadius(): void {
        let ctx = this.game.mainContext,
            { left, bottom, width, lineThickness } = this.loadingDrawParametrs,
            angleDivision = lineThickness / 2;

        ctx.beginPath();

        ctx.fillStyle = '#09082f';
        ctx.strokeStyle = "#fff";
        ctx.lineWidth = 0.5;
        ctx.moveTo(left, bottom);
        ctx.quadraticCurveTo(left, bottom - angleDivision, left + angleDivision, bottom - angleDivision);
        ctx.lineTo(left + width - angleDivision , bottom - angleDivision);
        ctx.quadraticCurveTo(left + width, bottom - angleDivision, left + width, bottom);
        ctx.quadraticCurveTo(left + width, bottom + angleDivision, left + width - angleDivision, bottom + angleDivision);
        ctx.lineTo(left + angleDivision, bottom + angleDivision);
        ctx.quadraticCurveTo(left, bottom + angleDivision, left, bottom);
        ctx.closePath()
        ctx.fill();
        ctx.stroke();
    }

}

export {
    LoadingGame
}