import { Game } from './../game';
import { Levels, InterfeceLevelData } from "./../levels";


interface InterfaceGamePlay{
    setDataGame: () => void;
    createKeysMap: () => any;

}


export default class gamePlay implements InterfaceGamePlay{
    game: Game;
    levels: Levels;
    title: string;
    bgImageId: string;
    levelData: InterfeceLevelData;

    constructor(game: Game) {
        this.game = game,
        this.title = null;
        this.levels = game.user.levels;
        this.levelData = null;
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
        this.levelData = level[countries].sights[sights].levels[playId];
        
        this.createKeysMap();
    }

    createKeysMap() {
        let data = this.levelData.keyData,
        map: Array<Array<any>> = [[]];
        console.log(data);
        

        for (const [key, property] of Object.entries(data)) {
            let { row, col, direction} = property,
                maxRow = key.length + row;
            
            if(map.length < maxRow){
                let cowfiller = Array(map[0].length).fill(false),
                    rowFiller = Array(maxRow - map.length).fill([...cowfiller]);
                map = [...map, ...rowFiller];                     
            }
            console.log(map);
            
            if (direction === 'down'){
                
            }
            
        }


    }
}