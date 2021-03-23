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
            countries: 0,
            sights: 1,
            playId: 6
        };
        this.levels = new Levels();
    }
}



export {
    User
}