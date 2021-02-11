import { createTextChangeRange } from 'typescript';
import { Game } from './../game';
import { Levels, InterfeceLevelData } from "./../levels";


interface InterfaceGamePlay{
    setDataGame: () => void;
    createKeysMap: () => Array<Array<boolean | string>>;
    paintHeading: () => void;
    setParamsTableOptions: ()=> void;
}


export default class gamePlay implements InterfaceGamePlay{
    game: Game;
    levels: Levels;
    title: string;
    bgImageId: string;
    levelData: InterfeceLevelData;
    map: Array<Array<boolean | string>>;
    headingData: {
        height: number;
        headingTextData: string,
        backIcon: {
            width: number,
            height: number,
            lineWidth: number
        }
    };
    backPath: Path2D;
    tableOtions: {
        width: number,
        height: number,
        x: number,
        y: number,
        rowCount: number,
        colCount: number,
        gap: number,
        cellSize: number
    };

    constructor(game: Game) {
        this.game = game,
        this.title = null;
        this.levels = game.user.levels;
        this.levelData = null;
        this.map = null;
        this.headingData = {
            height: 50,
            headingTextData: `${this.game.minMax(this.game.windowSize.width / 100 * 3 , 18, 24)}px Roboto`,
            backIcon: {
                width: 15,
                height: 25,
                lineWidth: 6
            }
        };
        this.backPath = null
        this.tableOtions = null;
    

    }

    init() {
        this.setDataGame();
        this.setParamsTableOptions();
        this.game.clearMainCanvas();
        this.paintHeading();
        this.paintGrid();
    }

    setDataGame() {
        const user = this.game.user,
            level = this.levels.countries,
            { countries, sights, playId } = user.levelData,
            handler = level[countries].sights[sights].handler;

        this.title = handler.heading,
        this.bgImageId = handler.img;
        this.levelData = level[countries].sights[sights].levels[playId];
        this.map = this.createKeysMap();
        this.game.setBackground(this.bgImageId);
    }
    setParamsTableOptions() {
        let minMax = this.game.minMax,
            map = this.map, 
            { width, height } = this.game.windowSize,
            rowCount = map.length,
            colCount = map[0].length,
            widthDivision = minMax(width / 100 * 80, 310, 900),
            heightDivision = minMax(height / 100 * 40, 250, 500),
            mainSize = Math.min(widthDivision, heightDivision),
            gap = 4,
            maxCellInDirection = Math.max(rowCount, colCount);

            this.tableOtions = {
                rowCount,
                colCount,
                width: mainSize,
                height: mainSize,
                x: (width - mainSize) / 2,
                y: this.headingData.height + 25,
                gap, 
                cellSize: (mainSize  - (gap * (maxCellInDirection - 1))) / maxCellInDirection
            }
    }

    paintGrid() {
        let { x, y, width, height, rowCount, colCount, cellSize, gap } = this.tableOtions,
            ctx = this.game.mainContext;
            ctx.fillStyle = 'red';

            ctx.fillRect(x, y, width, height);

            ctx.beginPath();  
            ctx.fillStyle = '#fff';
            for (let row = 0; row < rowCount; row++) {
                for (let col = 0; col < colCount; col++) {
                    let xr = x + cellSize * col + gap * col,
                        yr = y + cellSize * row + gap * row;
                        console.log(col ? gap : 0);
                        

                    ctx.rect(xr, yr, cellSize, cellSize)
                    ctx.fill();
                    
                }
            }              
    }

    paintHeading() {
        let ctx = this.game.mainContext,
            { height: heightHead, headingTextData } = this.headingData,
            { width } = this.game.windowSize,
            leftSpace = 30;
        
        if(!this.backPath) {
            let backPath = new Path2D(),
            { width, height, lineWidth } = this.headingData.backIcon,
            yStart =  (heightHead - height) / 2;
            ctx.lineWidth = lineWidth;
            backPath.moveTo( leftSpace + width, yStart);
            backPath.lineTo( leftSpace , yStart + height /2);
            backPath.lineTo( leftSpace + width, yStart + height);
            this.backPath = backPath;
        };

        ctx.lineCap = 'round';
        ctx.fillStyle = '#fff';
        ctx.stroke(this.backPath);

        ctx.font = headingTextData;
        ctx.textBaseline = 'middle';
        ctx.textAlign = 'center';
        ctx.fillText(`${this.title} ● ${this.game.user.levelCount}`, width / 2, heightHead / 2);
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