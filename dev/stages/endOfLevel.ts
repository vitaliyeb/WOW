import { Game } from "../game";


interface InterfaceEndOfLevel {
    init: () => void;
    nextSteep: (startYPosition: number, centerXPosition: number) => void;
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
    paths: Array<{callback: ()=> any, path: Path2D}>
    loadProgress: number;
    requestId: number;
    endLevelData: {
        sightsTitle: string;
        levelsStart: number;
        levelsEnd: number;
        levelCount: number,
        countLevelsDone: number;
    }

    constructor(game: Game) {
        this.game = game;
        this.mouseMove = this.mouseMove.bind(this);
        this.clickHandler = this.clickHandler.bind(this);
    }

    init() {
        this.paths = [];
        document.addEventListener('mousemove', this.mouseMove);
        document.addEventListener('click', this.clickHandler);
        this.loadProgress = 0;
        this.game.setBackground('mainBg', true);
        if(!this.arcData) this.arcSetData();
        this.loop();
    }

    mouseMove(e: MouseEvent) {
        let {x, y} = this.game.getCursorPosition(e),
            ctx = this.game.mainContext;
        document.body.style.cursor = this.paths.find(({ path }) => ctx.isPointInPath(path, x, y)) ? 'pointer' : 'default';
    }

    clickHandler(e: MouseEvent) {
        let {x, y} = this.game.getCursorPosition(e),
            ctx = this.game.mainContext;

        this.paths.find(({ path }) => ctx.isPointInPath(path, x, y))?.callback();
    }

    cancelEvents() {
        document.removeEventListener('mousemove', this.mouseMove);
        document.removeEventListener('click', this.clickHandler);
    }

    setEndLevelData() {
        let { countries, sights, playId } = this.game.user.levelData;
        let levels = this.game.user.levels;
        this.endLevelData = {
            sightsTitle: levels.countries[countries].sights[sights].title,
            levelsStart: playId,
            levelsEnd: playId + 1,
            levelCount: levels.countries[countries].sights[sights].levels.length,
            countLevelsDone: this.game.user.levelCount
        };
    }

    loop() {
        this.requestId = requestAnimationFrame(()=> this.loop());
        this.game.clearMainCanvas();
        this.setEndLevelData();
        this.paintArc();
        this.paintInfoBlock();
    }

    nextSteep(startYPosition: number, centerXPosition: number) {
        let { mainContext: ctx, createRect } = this.game,
            buttonWidth = 250,
            buttonHeight = 45,
            buttonPath = createRect(
                centerXPosition - buttonWidth / 2,
                startYPosition,
                buttonWidth,
                buttonHeight,
                buttonHeight / 2
            );
            ctx.fillStyle = 'red';
            ctx.fill(buttonPath);

            ctx.font = '18px roboto';
            ctx.fillStyle = '#fff';
            ctx.textBaseline = 'middle';
            ctx.fillText('ДАЛЬШЕ', centerXPosition, startYPosition + buttonHeight / 2);

            this.paths.push({
                callback: () => {
                    this.cancelEvents();
                    document.body.style.cursor = 'default';
                    this.game.setStatus('game');
                },
                path: buttonPath
            })
    }

    paintInfoBlock() {
        let {width, height} = this.game.windowSize,
            ctx = this.game.mainContext, 
            r = 28,
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
            fsLevelProgress = r * .45,
            interiorLoadingBorderWeight = 4,
            interiorLoadingWrapperHeight =  loadingWrapperHeight - interiorLoadingBorderWeight * 2,
            interiorLoadingWrapperWidth = loadinWrapperWidth - interiorLoadingBorderWeight * 2,
            { sightsTitle, levelsStart, levelsEnd, countLevelsDone, levelCount } = this.endLevelData;

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
        ctx.moveTo(x, y + r * 1.3);
        ctx.arc(x, y + r * 1.3, r, Math.PI, 0);
        ctx.fill();

        ctx.beginPath();
        ctx.fillStyle = '#36658e';
        let titleBgPath = this.game.createRect(
            x - titleWrapperWidth / 2 + interiorTitleBorder,
            y + r + interiorTitleBorder,
            titleWrapperWidth - interiorTitleBorder * 2,
            titleWrapperHeight - interiorTitleBorder * 2,
            interiorTitleBorder
        );
        ctx.fill(titleBgPath);

        ctx.fillStyle = '#fff';
        ctx.textBaseline = 'middle'
        ctx.textAlign = 'center';
        ctx.font = `400 ${(titleWrapperHeight - interiorTitleBorder * 2) * 0.55}px roboto`
        ctx.fillText(sightsTitle, x, y + r + interiorTitleBorder + (titleWrapperHeight - interiorTitleBorder * 2) * .55);

        ctx.textBaseline = 'bottom';
        ctx.font = `400 ${fsLevelProgress}px roboto`
        ctx.fillText(`${this.endLevelData.levelsEnd}/${this.endLevelData.levelCount}`, x, y + r - fsLevelProgress * 0);

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
        ctx.fillStyle = "green";

        let loadWidth = interiorLoadingWrapperWidth / levelCount * levelsStart + this.loadProgress,
            loadWidthEnd = interiorLoadingWrapperWidth / levelCount * levelsEnd;

        let loadPath = this.game.createRect(
            x - (loadinWrapperWidth / 2 - interiorLoadingBorderWeight),
            y + r + titleWrapperHeight + interiorLoadingBorderWeight,
            loadWidth,
            interiorLoadingWrapperHeight,
            interiorLoadingWrapperHeight / 2
        );
        ctx.fill(loadPath);

        ctx.beginPath();
        ctx.fillStyle = sirenColor;
        ctx.arc(x + loadinWrapperWidth / 2 - interiorLoadingBorderWeight,
             y + r + titleWrapperHeight + loadingWrapperHeight / 2 - interiorLoadingBorderWeight,
             (loadingWrapperHeight) / 2 + interiorLoadingBorderWeight,
             Math.PI * 2,
             0
            );

        ctx.fill();

        if (loadWidth <= loadWidthEnd){
            this.loadProgress+=4;
        } else {
            this.nextSteep(25 + y + r + titleWrapperHeight + loadingWrapperHeight, x);
            cancelAnimationFrame(this.requestId);
        }

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