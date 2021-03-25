import { Levels } from "./levels";
interface  InterfaceUser {

}


class User implements InterfaceUser {
    levelData: {
        countries: number;
        sights: number;
        playId: number;

    };
    levelCount: number;
    levels: Levels;


    constructor() {
        this.levelCount = 0;
        this.levelData = {
            countries: 2,
            sights: 0,
            playId: 0
        };
        this.levels = new Levels();
    }
}



export {
    User
}