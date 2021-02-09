import { Game } from './../game';
import { Levels } from "./../levels";


interface InterfaceGamePlay{

}


export default class gamePlay implements InterfaceGamePlay{
    game: Game;
    levels: Levels;
    title: string;
    bgImageId: string;

    constructor(game: Game) {
        this.game = game,
        this.title = null;
        this.levels = game.user.levels;
    }

    init() {
        this.setDataGame();
    }

    setDataGame() {
        const user = this.game.user,
            level = this.levels.countries,
            { countries, sights, playId } = user.levelData,
            handler = level[countries].sights[sights].handler;

        this.title = handler.heading,
        this.bgImageId = handler.img;
                

    }
}