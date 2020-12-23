import {Game} from "../game";


interface InterfaceGlobalMenu {
    init: ()=> void;
    clearMainCanvas: ()=> Path2D;
}

export default class GlobalMenu {
    game: Game
    paths: {
        playButton: Path2D
    };
    buttonPlayGradient: CanvasGradient;

    constructor(game: Game) {
        this.game = game;
        this.buttonPlayGradient = undefined;
        this.paths = {
            'playButton': undefined
        };
    }

    init(): void {
        this.game.clearMainCanvas();
        if (!this.paths.playButton) this.paths.playButton = this.createPathButtonPlay();
        this.paintButtonPlay();
    }

    paintButtonPlay() {
        let ctx = this.game.mainContext;

        ctx.beginPath();
        ctx.fillStyle = this.buttonPlayGradient;
        ctx.fill(this.paths.playButton);
    }

    createPathButtonPlay(): Path2D {
        let { width: windowWidth, height: windowHeight } = this.game.windowSize,
            width = this.game.minMax(windowWidth / 100 * 60, 300, 550),
            left = windowWidth / 2 - width / 2,
            height = this.game.minMax(windowHeight / 100 * 10, 40, 55),
            bottom = windowHeight / 100 * 60,
            angleDivision = height / 2,
            path = new Path2D();

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

}