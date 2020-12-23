import { Game } from "../game";

interface InterfaceLoadingGame {
    init: (arrFunctionPromise: Array<()=>Promise<any>>)=> void;
    loadingLoop: ()=> void;
    paintLoading: ()=> void;
    CreateRectangleBorderRadius: (left:number, bottom:number, width:number, lineThickness:number)=> Path2D;
    paintLoadingProcess: ()=> void;
}

class LoadingGame implements InterfaceLoadingGame{
    game: Game;
    loadingDrawParametrs: {
        bottom: number,
        width: number,
        left: number,
        lineThickness: number,
        lineWidth: number
    };
    paths: {
        loadingWrapper: Path2D
    };
    defaultLoaders: Array<()=>Promise<any>>
    processing: number;
    percentage: number;
    lazyProcessing: number;

    constructor(game: Game) {
        this.game = game;
        this.paths = {
            loadingWrapper: undefined
        };
        this.processing = 0;
        this.lazyProcessing = 0;
        this.percentage = undefined;
        this.loadingDrawParametrs = {
            bottom: game.windowSize.height - game.windowSize.height / 100 * 17,
            width: game.windowSize.width / 100 * 80,
            left: game.windowSize.width / 100 * 10,
            lineThickness: 10,
            lineWidth: .5
        };
        this.defaultLoaders = [
            ()=>new Promise((resolve)=>setTimeout(()=>resolve(1), 500)),
            ()=>new Promise((resolve)=>setTimeout(()=>resolve(2), 500)),
            ()=>new Promise((resolve)=>setTimeout(()=>resolve(3), 500)),
            ()=>new Promise((resolve)=>setTimeout(()=>resolve(4), 500))
        ];
    }


    init(arrFunctionPromise = this.defaultLoaders):void {
        this.game.setBackground('./images/loadingBg.jpg');
        this.percentage = this.loadingDrawParametrs.width / 100;
        this.loading(arrFunctionPromise);
        this.paintLoading();
        this.loadingLoop();
    }

    loading(arrFunctionPromise: Array<any>): void{
        let division = 100 / arrFunctionPromise.length;
        Promise.all(arrFunctionPromise.map((f)=>{
            return new Promise((resolve)=>{
                f().then(()=> this.processing+= division)
            });
        }))
            .then(()=>this.processing = 100);
    };

    paintLoading(): void{
        if (!this.paths.loadingWrapper) {
            let {left, bottom, width, lineThickness} = this.loadingDrawParametrs;
            this.paths.loadingWrapper = this.CreateRectangleBorderRadius(left, bottom, width, lineThickness);
        };
        this.paintDrawLoadingWrapper();
        this.paintLoadingProcess();
    }

    loadingLoop():void {
        if (this.lazyProcessing < this.processing) this.lazyProcessing+=.6;
        this.paintLoadingProcess();
        if (this.lazyProcessing >= 100) return this.game.setStatus('globalMenu');
        requestAnimationFrame(()=>this.loadingLoop());
    }

    paintLoadingProcess(): void {
        if (this.processing < 1) return;
        let {left, bottom, lineThickness, lineWidth} = this.loadingDrawParametrs,
            ctx = this.game.mainContext,
            width = this.lazyProcessing * this.percentage,
            path = this.CreateRectangleBorderRadius(left, bottom, width, lineThickness-lineWidth-0.5);
        ctx.beginPath();
        ctx.fillStyle = '#aebacd';
        ctx.fill(path);
    }

    paintDrawLoadingWrapper(): void {
        let ctx = this.game.mainContext;
        ctx.beginPath();
        ctx.fillStyle = '#09082f';
        ctx.strokeStyle = "#fff";
        ctx.lineWidth = this.loadingDrawParametrs.lineWidth;
        ctx.fill(this.paths.loadingWrapper);
        ctx.stroke(this.paths.loadingWrapper);
    }

    CreateRectangleBorderRadius(left:number, bottom:number, width:number, lineThickness:number): Path2D {
        let path = new Path2D(),
            angleDivision = lineThickness / 2;

        path.moveTo(left, bottom);
        path.quadraticCurveTo(left, bottom - angleDivision, left + angleDivision, bottom - angleDivision);
        path.lineTo(left + width - angleDivision , bottom - angleDivision);
        path.quadraticCurveTo(left + width, bottom - angleDivision, left + width, bottom);
        path.quadraticCurveTo(left + width, bottom + angleDivision, left + width - angleDivision, bottom + angleDivision);
        path.lineTo(left + angleDivision, bottom + angleDivision);
        path.quadraticCurveTo(left, bottom + angleDivision, left, bottom);
        path.closePath()
        return path;
    }

}

export {
    LoadingGame
}