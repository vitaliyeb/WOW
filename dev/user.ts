import {Game} from "./game";
import { Levels } from "./levels";
interface  InterfaceUser {

}


class User implements InterfaceUser {
    game: Game;
    levelData: {
        countries: number;
        sights: number;
        playId: number;

    };
    levelCount: number;
    levels: Levels;


    constructor(game: Game) {
        this.game = game;
        this.levelCount = 2;
        this.levelData = {
            countries: 0,
            sights: 1,
            playId: 1
        };
        this.levels = new Levels();
    }
}



export {
    User
}