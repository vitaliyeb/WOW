import { createTextChangeRange } from 'typescript';
import { Game } from './../game';
import { Levels, InterfeceLevelData } from "./../levels";


interface InterfaceGamePlay{
    setDataGame: () => void;
    createKeysMap: () => Array<Array<boolean | string>>;
    paintHeading: () => void;
    setParamsTableOptions: ()=> void;
    paintInputsWord: () => void;
}

interface InterfaceCoordData {
    x: number;
    y: number;
}

interface InnterfaceLetterPath {
    letter: string,
    path: Path2D,
    x: number,
    y: number,
    isSelect: boolean
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
        cellSize: number,
        borderRadius: number
    };
    enteredTeextData: {
        outside: number,
        height: number,
        y: number
    };
    temporaryWord: string;
    arcData: { 
        width: number,
        height: number,
        r: number,
        letterSpace: number,
        cx: number,
        cy: number,
        y: number,
        insideRadius: number,
        letterStep: number,
        insideFs: number
    };
    preDone: boolean;
    done: boolean;
    letterPaths: Array<InnterfaceLetterPath>;
    inputLetters: Array<InterfaceCoordData>;
    mouseData: InterfaceCoordData;
    historyAddLetter: Array<InnterfaceLetterPath>;
    letterTransformK: number;

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
        this.enteredTeextData = null;
        this.temporaryWord = '';
        this.inputLetters = [];
        this.historyAddLetter = [];
        this.preDone = false;
        this.letterTransformK = 0;
        this.done = false;

        this.mouseMove = this.mouseMove.bind(this);
        this.click = this.click.bind(this);
        this.onMouseDown = this.onMouseDown.bind(this);
        this.mouseUp = this.mouseUp.bind(this);
    }

    mouseMove(e: MouseEvent) {
        let {x, y} = this.game.getCursorPosition(e),
            ctx = this.game.mainContext,
            letter = this.letterPaths.find(i=>ctx.isPointInPath(i.path, x, y)),
            screenWrapper = this.game.screenWrapper;

        if(this.inputLetters.length ){
            this.mouseData = {x, y};
            if(letter) {
                if(!letter.isSelect) {
                    letter.isSelect = true; 
                    this.temporaryWord += letter.letter;
                    this.inputLetters.push({x: letter.x, y: letter.y});
                    return this.historyAddLetter.push(letter);
                }
                if(letter === this.historyAddLetter[this.historyAddLetter.length - 2]) {
                    this.inputLetters.pop();
                    let letter = this.historyAddLetter.pop();
                    letter.isSelect = false;
                    this.temporaryWord = this.temporaryWord.slice(0, -1);
                }

            }
        }    
            
        if(letter)  return screenWrapper.style.cursor = 'pointer';
        if(ctx.isPointInStroke(this.backPath, x, y))  return screenWrapper.style.cursor = 'pointer';
        return screenWrapper.style.cursor = 'default';
    }

    click(e: MouseEvent) {
        let {x, y} = this.game.getCursorPosition(e),
            ctx = this.game.mainContext;

        if(ctx.isPointInStroke(this.backPath, x, y)){
            this.game.setStatus('globalMenu');
        }
    }

    checkWordInTable() {
        let word = this.temporaryWord,
            wordData = this.levelData.keyData[word];
        
        if(wordData) {
            let { direction, col, row } = wordData,
                letters = word.split('');
            wordData.selected = true;    
            
            if(direction === 'down'){
                letters.forEach((letter, inedx) => this.map[row + inedx][col] = letter);
            }

            if(direction === 'right'){
                letters.forEach((letter, inedx) => this.map[row][col + inedx] = letter);
            }
            
            if(Object.values(this.levelData.keyData).every(letterData => letterData.selected)) return this.done = true;
        }
    }

    passed() {
        let { mainContext: ctx, windowSize: {width, height}} = this.game,
            text = 'ВЕЛИКОЛЕПНО',
            messageHeight = 50;

        ctx.beginPath();
        ctx.fillStyle = '#cd2b58';
        ctx.fillRect(0, (height - messageHeight) / 2, width, messageHeight);

        ctx.fillStyle = '#fff';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.font = 'bold 22px Roboto';
        let textWidth = ctx.measureText(text).width,
            k = this.letterTransformK += .15, 
            letterArr = text.split(''),
            xs = (width - textWidth - (letterArr.length * k)) / 2;
        
        letterArr.forEach((letter, i) => {
            let letterWidth = 15;
            ctx.fillText(letter, xs + letterWidth * i + k * i, height / 2);
        });
        if(k > 15) {
            this.clearStage()
            this.game.nextLevel();
            this.game.setStatus('endOfLevel');
        };
    }

    clearStage() {
        this.done = true;
        document.removeEventListener('mousemove', this.mouseMove);
        document.removeEventListener('click', this.click);
        document.removeEventListener('mousedown', this.onMouseDown);
        document.removeEventListener('mouseup', this.mouseUp);

    }

    onMouseDown(e: MouseEvent) {
        let {x, y} = this.game.getCursorPosition(e),
            ctx = this.game.mainContext,
            letter = this.letterPaths.find(i=>ctx.isPointInPath(i.path, x, y));
        
        if(letter){
            this.historyAddLetter.push(letter);
            this.inputLetters.push({x: letter.x, y: letter.y});
            letter.isSelect = true;
            this.temporaryWord = letter.letter;
            this.mouseData = {x, y};
        }
    }

    init() {
        this.done = false;
        this.setDataGame();
        this.setParamsTableOptions();
        this.setEnteredTeextData();
        this.initArcData();

        this.loop();
        
        document.addEventListener('mousemove', this.mouseMove);
        document.addEventListener('click', this.click);
        document.addEventListener('mousedown', this.onMouseDown);
        document.addEventListener('mouseup', this.mouseUp);
    }

    mouseUp() {
        this.checkWordInTable();
        this.inputLetters = [];
        this.letterPaths.forEach((letter, index, arr)=> arr[index].isSelect = false);  
        this.historyAddLetter = [];
        this.temporaryWord = '';
    }

    paintLine() { 
        let ctx = this.game.mainContext,
            {x, y} = this.mouseData;

        ctx.beginPath();
        ctx.strokeStyle = '#e42e61';
        ctx.lineWidth = 7;
        this.inputLetters.forEach(({x, y}) => {
            ctx.lineTo(x, y);
        });
        ctx.lineTo(x, y);
        ctx.stroke();
    }

    paintArcLetters() {
        let { cy, cx,  width, height, r, insideRadius, letterStep, insideFs } = this.arcData,
            ctx = this.game.mainContext;

        ctx.beginPath();   
        ctx.shadowBlur = 5;
        ctx.shadowColor = '#9ba1b7';
        ctx.fillStyle = '#d9dbe0cf'; 
        ctx.arc(cx , cy, r, 0, Math.PI * 2);    
        ctx.fill();
        ctx.shadowBlur = 0;

        if(this.inputLetters.length) this.paintLine();

        this.letterPaths.map(({letter, path, x, y, isSelect})=>{
            if(isSelect){
                ctx.fillStyle = '#e42e61';
                ctx.fill(path);
            }
            ctx.font = `bold ${insideFs}px Roboto`;
            ctx.fillStyle = isSelect ? '#fff' : '#18416a';
            ctx.fillText(letter, x, y + insideFs * .1);
            ctx.beginPath();
            
        })
    }

    initArcData() {
        let {width, height} = this.game.windowSize,
            ctx = this.game.mainContext,
            minMax = this.game.minMax,
            blockSize = Math.min(minMax(width / 100 * 80, 250, 900), minMax(height / 100 * 40, 250, 500)),
            y = this.enteredTeextData.y + this.enteredTeextData.height + 15,  
            r = blockSize / 2,
            insidePadding = 15,
            insideFs = r / 4,
            cx = (width - blockSize) / 2 + r,
            cy = y + r,
            insideRadius = r - insidePadding - insideFs / 2,
            letterStep = (Math.PI * 2) / this.levelData.letters.length;

        this.arcData = { 
            width: blockSize,
            height: blockSize,
            r,
            letterSpace: 0,
            cx,
            cy,
            y,
            insideFs,
            insideRadius,
            letterStep
        };        

        this.letterPaths = this.levelData.letters.map((letter, i) => {
            let path = new Path2D(),
                x = cx + (insideRadius * Math.sin(i * letterStep)),
                y = cy + (insideRadius * Math.cos(i * letterStep));   
            path.arc(x, y, insideFs, 0, Math.PI*2);
            return {
                letter,
                path,
                x,
                y,
                isSelect: false
            }
        });
    }

    loop() {
        this.game.clearMainCanvas();
        this.paintHeading();
        this.paintGrid();
        this.paintArcLetters();
        if(this.temporaryWord.length) this.paintInputsWord();
        if(this.preDone) this.passed();
        if(this.done) return;
        requestAnimationFrame(() => this.loop());
    }

    setEnteredTeextData() {
        let { height, y } = this.tableOtions,
            outside = 20;
        this.enteredTeextData = {
            outside,
            height: 30,
            y: y + height + outside
        }
    }

    setDataGame() {
        const user = this.game.user,
            level = this.levels.countries,
            { countries, sights, playId } = user.levelData,
            handler = level[countries].sights[sights].handler;

        this.letterTransformK = 0;
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
            blockSize = Math.min(minMax(width / 100 * 80, 250, 900), minMax(height / 100 * 40, 250, 500)),
            gap = 4,
            maxCellInDirection = Math.max(rowCount, colCount),
            cellSize = (blockSize  - (gap * (maxCellInDirection - 1))) / maxCellInDirection,
            totalWidth = cellSize * colCount + gap * (colCount - 1),
            totalHeight = cellSize * rowCount + gap * (rowCount - 1);

            this.tableOtions = {
                rowCount,
                colCount,
                width: totalWidth,
                height: totalHeight,
                x: (width - totalWidth) / 2,
                y: this.headingData.height + 25,
                gap, 
                cellSize,
                borderRadius: 5
            }
    }

    paintGrid() {
        let { x, y, rowCount, colCount, cellSize, gap, borderRadius } = this.tableOtions,
            { mainContext: ctx } = this.game,
            map = this.map;

            ctx.beginPath();  
            ctx.font = `${cellSize / 1.6}px Roboto`;

            for (let row = 0; row < rowCount; row++) {
                for (let col = 0; col < colCount; col++) {
                    let xr = x + cellSize * col + gap * col,
                        yr = y + cellSize * row + gap * row,
                        item = map[row][col];
                     
                    ctx.shadowBlur = 2;
                    ctx.shadowColor = '#b1adad59';    
                    if(item && typeof item === 'boolean'){
                        ctx.fillStyle = '#ebe9e9'; 
                        let path = this.game.createRect(xr, yr, cellSize, cellSize, borderRadius)
                        ctx.fill(path);
                    }              

                    if(typeof item === 'string'){
                        ctx.fillStyle = '#e42e61';
                        let path = this.game.createRect(xr, yr, cellSize, cellSize, borderRadius)
                        ctx.fill(path);
                        ctx.shadowBlur = 0;
                        ctx.fillStyle = '#ebe9e9'; 
                        ctx.fillText(item, xr + cellSize / 2, yr + cellSize / 1.8);
                    }   
                }
            }              
    }

    paintInputsWord() {
        let ctx  = this.game.mainContext,
            width = this.game.windowSize.width,
            { height, y } = this.enteredTeextData,
            text = this.temporaryWord,
            padding = 14;

        ctx.font = `bold ${height * .8}px Roboto`;
        let textWidth = ctx.measureText(text).width;

        ctx.fillStyle = '#d72a46';
        ctx.fill(this.game.createRect((width - textWidth) / 2 - padding, y, textWidth + padding * 2, height,  height / 2));

        ctx.fillStyle = '#ebe9e9';
        ctx.fillText(text, width / 2, y + height / 2 + height * .06)
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
        ctx.strokeStyle= '#fff';
        ctx.stroke(this.backPath);

        ctx.font = headingTextData;
        ctx.textBaseline = 'middle';
        ctx.textAlign = 'center';
        ctx.fillStyle = '#fff';
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
                    max = row + key.length;
                for (let row = min; row < max; row++) map[row][col] = true;  
            }

            if(direction == 'right'){
                let min = col,
                    max = col + key.length;
                for (let col = min; col < max; col++) map[row][col] = true;  
            }
        });                
        return map;
    }
}