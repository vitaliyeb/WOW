import {Game} from "./game";
interface  InterfaceUser {

}


class User implements InterfaceUser {
    game: Game;
    level: number


    constructor(game: Game) {
        this.game = game;
        this.level = 0;
    }
}



export {
    User
}