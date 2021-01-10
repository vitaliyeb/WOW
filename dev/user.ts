import {Game} from "./game";
import { Levels } from "./levels";
interface  InterfaceUser {

}


class User implements InterfaceUser {
    game: Game;
    level: number
    levels: Levels;


    constructor(game: Game) {
        this.game = game;
        this.level = 0;
        this.levels = new Levels();
    }
}



export {
    User
}