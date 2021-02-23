import { Game } from "../game";


interface InterfaceEndOfLevel {
    init: () => void;
}

export default class EndOfLevel implements InterfaceEndOfLevel{
    game: Game;
    arcData: {
        radius: number;
        x: number;
        y: number;
    }

    constructor(game: Game) {
        this.game = game;
    }

    init() {
        this.game.setBackground('mainBg', true);
        this.game.clearMainCanvas();
        if(!this.arcData) this.arcSetData();

    }

    arcSetData() {
        let {width, height} = this.game.windowSize,
            minSize =   Math.min(width, height),
            radius = minSize / 100 * 15;

        this.arcData = {
            x: width / 2,
            y: height / 100 * 10 + radius,
            radius
        }
    }

    paintArc() {
        let ctx = this.game.mainContext;



    }
}