import { Game } from "../game";


interface InterfaceEndOfLevel {
    init: () => void;
}

export default class EndOfLevel implements InterfaceEndOfLevel{
    game: Game;

    constructor(game: Game) {
        this.game = game;
    }

    init() {
        this.game.setBackground('mainBg', true);
        console.log('sasdasd');
        this.game.clearMainCanvas();
    }

}