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
            titleWrapperHeight = 35,
            loadinWrapperWidth = this.game.minMax(width / 100 * 90, 300, 500),
            interiorTitleBorder = 5,
            loadingWrapperHeight = 30,
            borderRadius = 16,
            y = this.arcData.endY + 30 + r / 2,
            x = width / 2,
            interiorLoadingBorderWeight = 4,
            interiorLoadingWrapperHeight =  loadingWrapperHeight - interiorLoadingBorderWeight * 2,
            interiorLoadingWrapperWidth = loadinWrapperWidth - interiorLoadingBorderWeight * 2;

        ctx.beginPath();
        ctx.fillStyle = sirenColor;
        ctx.moveTo(x - (titleWrapperWidth / 2 - borderRadius / 2), y + r);
        ctx.lineTo(x - r / 2,  y + r);
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
        ctx.arc(x, y + r * 1.3, r, Math.PI, 0);
        ctx.fill();

        ctx.beginPath();
        ctx.fillStyle = 'red';
        let titleBgPath = this.game.createRect(
            x - titleWrapperWidth / 2 + interiorTitleBorder,
            y + r + interiorTitleBorder,
            titleWrapperWidth - interiorTitleBorder * 2,
            titleWrapperHeight - interiorTitleBorder * 2,
            interiorTitleBorder
        );
        ctx.fill(titleBgPath);

        // ctx.fillStyle = '#fff';
        // ctx.textBaseline = 'middle'
        // ctx.textAlign = 'center';
        // ctx.font = `400 ${titleWrapperHeight * 0.65}px roboto`
        // ctx.fillText(this.endLevelData.sightsTitle, x, y + r + titleWrapperHeight / 1.5);

        ctx.beginPath();
        ctx.fillStyle = darkSirenColor;

        let interiorLoadingPath = this.game.createRect(
            x - (loadinWrapperWidth / 2 - interiorLoadingBorderWeight),
            y + r + titleWrapperHeight + interiorLoadingBorderWeight,
            interiorLoadingWrapperWidth,
            interiorLoadingWrapperHeight,
            interiorLoadingWrapperHeight / 2
        );
        ctx.fill(interiorLoadingPath);

        ctx.beginPath();
        ctx.fillStyle = sirenColor;
        ctx.arc(x + loadinWrapperWidth / 2 - interiorLoadingBorderWeight,
             y + r + titleWrapperHeight + loadingWrapperHeight / 2 - interiorLoadingBorderWeight,
             (loadingWrapperHeight) / 2 + interiorLoadingBorderWeight,
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