import { Game } from "../game";


interface InterfaceEndOfLevel {
    init: () => void;
}

export default class EndOfLevel implements InterfaceEndOfLevel{
    game: Game;
    arcData: {
        radius: number;
        x: number;
        y: number;
        gradient: CanvasGradient,
        endY: number
    }
    endLevelData: {
        sightsTitle: string;
        levelsStart: number;
        levelsEnd: number;
        countLevelsDone: number;
    }

    constructor(game: Game) {
        this.game = game;
    }

    init() {
        this.game.setBackground('mainBg', true);
        this.game.clearMainCanvas();
        if(!this.arcData) this.arcSetData();
        this.setEndLevelData();
        this.paintArc();
        this.paintInfoBlock();
    }

    setEndLevelData() {
        let { countries, sights, playId } = this.game.user.levelData;
        let levels = this.game.user.levels;
        this.endLevelData = {
            sightsTitle: levels.countries[countries].sights[sights].title,
            levelsStart: playId,
            levelsEnd: playId + 1,
            countLevelsDone: this.game.user.levelCount
        };
    }

    paintInfoBlock() {
        let {width, height} = this.game.windowSize,
            ctx = this.game.mainContext, 
            r = 24,
            sirenColor = '#3f83be',
            darkSirenColor = 'red', 
            titleWrapperWidth = this.game.minMax(width / 100 * 80, 260, 450),
            titleWrapperHeight = 30,
            loadinWrapperWidth = this.game.minMax(width / 100 * 90, 300, 500),
            loadingWrapperHeight = 30,
            borderRadius = 16,
            y = this.arcData.endY + 30 + r / 2,
            x = width / 2,
            ineriorLoadingBorderWeight = 4,
            interiorLoadingWrapperHeight =  loadingWrapperHeight - ineriorLoadingBorderWeight * 2,
            interiorLoadingWrapperWidth = loadinWrapperWidth - ineriorLoadingBorderWeight * 2;

        ctx.beginPath();
        ctx.fillStyle = sirenColor;
        ctx.moveTo(x - (titleWrapperWidth / 2 - borderRadius / 2), y + r);
        ctx.lineTo(x - r / 2,  y + r);
        ctx.arc(x, y + r, r, Math.PI, 0);
        ctx.lineTo(x + (titleWrapperWidth / 2) - borderRadius / 2, y + r);
        ctx.quadraticCurveTo(x + titleWrapperWidth / 2, y + r, x + titleWrapperWidth / 2, y + r + borderRadius / 2);
        ctx.lineTo(x + titleWrapperWidth / 2, y + r + titleWrapperHeight - borderRadius /2);
        ctx.quadraticCurveTo(x + titleWrapperWidth / 2, y + r + titleWrapperHeight, x + titleWrapperWidth / 2 + borderRadius / 2, y + r + titleWrapperHeight);
        ctx.lineTo(x + loadinWrapperWidth / 2, y + r + titleWrapperHeight);
        ctx.lineTo(x + loadinWrapperWidth / 2, y + r + titleWrapperHeight + loadingWrapperHeight);
        ctx.lineTo(x - (loadinWrapperWidth / 2 - loadingWrapperHeight / 2), y + r + titleWrapperHeight + loadingWrapperHeight);
        ctx.quadraticCurveTo(x - loadinWrapperWidth / 2, y + r + titleWrapperHeight + loadingWrapperHeight, x - loadinWrapperWidth / 2, y + r + titleWrapperHeight + loadingWrapperHeight / 2);
        ctx.quadraticCurveTo(x - loadinWrapperWidth / 2, y + r + titleWrapperHeight, x - (loadinWrapperWidth / 2 - loadingWrapperHeight / 2), y + r + titleWrapperHeight);
        ctx.quadraticCurveTo(x - (titleWrapperWidth / 2), y + r + titleWrapperHeight, x - titleWrapperWidth / 2, y + r + titleWrapperHeight - borderRadius / 2);
        ctx.lineTo(x - (titleWrapperWidth / 2),  y + r + borderRadius /2);
        ctx.quadraticCurveTo(x - titleWrapperWidth / 2, y + r, x - (titleWrapperWidth / 2 - borderRadius / 2), y + r);
        ctx.fill();     

        ctx.beginPath();
        ctx.fillStyle = darkSirenColor;

        let interiorLoadingPath = this.game.createRect(
            x - (loadinWrapperWidth / 2 - ineriorLoadingBorderWeight), 
            y + r + titleWrapperHeight + ineriorLoadingBorderWeight,
            interiorLoadingWrapperWidth,
            interiorLoadingWrapperHeight,
            interiorLoadingWrapperHeight / 2
        );
        ctx.fill(interiorLoadingPath);

        ctx.beginPath();
        ctx.fillStyle = sirenColor;
        ctx.arc(x + loadinWrapperWidth / 2 - ineriorLoadingBorderWeight, 
             y + r + titleWrapperHeight + loadingWrapperHeight / 2 - ineriorLoadingBorderWeight,
             (loadingWrapperHeight) / 2 + ineriorLoadingBorderWeight,
             Math.PI * 2,
             0
            );

        ctx.fill();


    }

    arcSetData() {
        let {width, height} = this.game.windowSize,
            minSize =   Math.min(width, height),
            radius = minSize / 100 * 15,
            y = height / 100 * 20 + radius,
            gradient = this.game.mainContext.createLinearGradient(0, 0, width, height);
            gradient.addColorStop(0, '#697af3');
            gradient.addColorStop(1, '#7d42d1');

        this.arcData = {
            x: width / 2,
            y,
            radius,
            gradient,
            endY: y + radius
        }
    }

    paintArc() {
        let ctx = this.game.mainContext,
            {x, y, radius, gradient} = this.arcData;

        ctx.beginPath();
        ctx.fillStyle = gradient;
        ctx.arc(x, y, radius, 0, Math.PI*2)
        ctx.fill();
        ctx.fillStyle = '#fff';
        ctx.font = `${radius * .28}px Roboto`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(String(this.game.user.levelCount), x, y);
    }
} 