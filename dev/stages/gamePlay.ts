import { Game } from './../game';


interface InterfaceGamePlay{

}


export default class gamePlay implements InterfaceGamePlay{
    game: Game;

    constructor(game: Game) {
        this.game = game;
    }

    init() {

    }


}