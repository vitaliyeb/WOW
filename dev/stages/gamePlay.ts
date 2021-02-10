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
        map: Array<Array<any>> =null,
        dataEntry = Object.entries(data),
        maxRow = [1],
        maxCol = [1];
        
        dataEntry.forEach(([key, data])=> {
            if(data.direction === 'down') maxRow.push(data.row + key.length);
            if(data.direction === 'right') maxCol.push(data.col + key.length);
        });
        
        map = Array(Math.max(...maxRow)).fill(0).map(()=>Array(Math.max(...maxCol)).fill(false));
        
        dataEntry.forEach(([key, {direction, row, col}])=> {
            if(direction == 'down'){
                let min = row,
                    max = row + key.length,
                    letters = key.split('');
                for (let row = min; row < max; row++) map[row][col] = letters.shift();  
            }

            if(direction == 'right'){
                let min = col,
                    max = col + key.length,
                    letters = key.split('');
                for (let col = min; col < max; col++) map[row][col] = letters.shift();  
            }
        });                
        return map;
    }
}