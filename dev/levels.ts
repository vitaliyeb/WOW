
interface InterfeceLevelData {
    keyData: {
        [key: string]: {
            row: number;
            col: number;
            direction: string;
            selected?: boolean;
        };
    };
    letters: Array<string>
}

interface InterfaceSights {
    title: string,
    status: "done" | "process" | "block",
    handlerId: string;
    handler: InterfaceSightHandler,
    levels: Array<InterfeceLevelData>
}

interface InterfaceSightHandler {
    img: string,
    heading: string,
    description: string
}

interface InterfaceСountry {
    country: string,
    imageName: string,
    status: "done" | "process" | "block",
    sights: Array<InterfaceSights>
}


interface InterfaceLevels {

    getLevel: (level: number)=> InterfaceСountry
}

class Levels implements InterfaceLevels{
    countries: Array<InterfaceСountry>

    constructor() {
        this.countries = [
            {
                country: 'ЕГИПЕТ',
                imageName: 'locationEgipet',
                status: 'process',
                sights: [
                    {
                        title: 'ПИРАМИДЫ ГИЗЫ',
                        status: 'done',
                        handlerId: "1",
                        handler: {
                            img: 'gizaBg',
                            heading: 'ПИРАМИДЫ ГИЗЫ',
                            description: 'Пирамиды Гизы - это древние усыпальницы - первое из семи чудес света.'
                        },
                        levels: [
                            {
                                keyData: {
                                    'СОН': {
                                        row: 0,
                                        col: 1,
                                        direction: 'down'
                                    },
                                    'НОС': {
                                        row: 1,
                                        col: 0,
                                        direction: 'right'
                                    }
                                },
                                letters: ["О", "С", "Н"]
                            },
                            {
                                keyData: {
                                    'ВОР': {
                                        row: 0,
                                        col: 2,
                                        direction: 'down'
                                    },
                                    'РОВ': {
                                        row: 0,
                                        col: 0,
                                        direction: 'right'
                                    }
                                },
                                letters: ["О", "Р", "В"]
                            },
                            {
                                keyData: {
                                    'ЛОСЬ': {
                                        row: 0,
                                        col: 2,
                                        direction: 'down'
                                    },
                                    'СОЛЬ': {
                                        row: 0,
                                        col: 0,
                                        direction: 'right'
                                    },
                                    'ОСЬ': {
                                        row: 3,
                                        col: 0,
                                        direction: 'right'
                                    }
                                },
                                letters: ["Л", "О", "С", "Ь"]
                            },
                            {
                                keyData: {
                                    'ФАРШ': {
                                        row: 0,
                                        col: 1,
                                        direction: 'down'
                                    },
                                    'ШАРФ': {
                                        row: 1,
                                        col: 0,
                                        direction: 'right'
                                    },
                                    'ШАР': {
                                        row: 3,
                                        col: 1,
                                        direction: 'right'
                                    }
                                },
                                letters: ["Ф", "А", "Р", "Ш"]
                            },
                        ]
                    },
                    {
                        title: 'БОЛЬШОЙ СФИНКС',
                        status: 'process',
                        handlerId: "2",
                        handler: {
                            img: 'bigSfinxBg',
                            heading: 'БОЛЬШОЙ СФИНКС',
                            description: 'Большой сфинкс на западном берегу Нила в Гизе — древнейшая сохранившаяся на Земле монументальная скульптура.'
                        },
                        levels: [
                            {
                                keyData: {
                                    'ГОЛ': {
                                        row: 0,
                                        col: 3,
                                        direction: 'down'
                                    },
                                    'ЛУГ': {
                                        row: 0,
                                        col: 1,
                                        direction: 'right'
                                    },
                                    'ГУЛ': {
                                        row: 1,
                                        col: 0,
                                        direction: 'down'
                                    },
                                    'УГОЛ': {
                                        row: 2,
                                        col: 0,
                                        direction: 'right'
                                    }
                                },
                                letters: ["У", "Г", "О", "Л"]
                            },
                            {
                                keyData: {
                                    'КРАБ': {
                                        row: 1,
                                        col: 2,
                                        direction: 'down'
                                    },
                                    'БРАК': {
                                        row: 0,
                                        col: 5,
                                        direction: 'down'
                                    },
                                    'РЫБАК': {
                                        row: 4,
                                        col: 0,
                                        direction: 'right'
                                    },
                                    'БАК': {
                                        row: 1,
                                        col: 0,
                                        direction: 'right'
                                    },
                                    'РЫБА': {
                                        row: 2,
                                        col: 2,
                                        direction: 'right'
                                    }
                                },
                                letters: ["Р", "Ы", "Б", "А", "К"]
                            },
                            {
                                keyData: {
                                    'АДРЕС': {
                                        row: 0,
                                        col: 3,
                                        direction: 'down'
                                    },
                                    'СЕРА': {
                                        row: 0,
                                        col: 0,
                                        direction: 'right'
                                    },
                                    'ДАР': {
                                        row: 1,
                                        col: 3,
                                        direction: 'right'
                                    },
                                    'САД': {
                                        row: 0,
                                        col: 0,
                                        direction: 'down'
                                    },
                                    'СРЕДА': {
                                        row: 3,
                                        col: 1,
                                        direction: 'right'
                                    }
                                },
                                letters: ["А", "Д", "Р", "Е", "С"]
                            },
                            {
                                keyData: {
                                    'ФАЗА': {
                                        row: 0,
                                        col: 2,
                                        direction: 'down'
                                    },
                                    'ФРАЗА': {
                                        row: 3,
                                        col: 0,
                                        direction: 'right'
                                    },
                                    'АРА': {
                                        row: 1,
                                        col: 0,
                                        direction: 'right'
                                    },
                                    'РАЗ': {
                                        row: 2,
                                        col: 4,
                                        direction: 'down'
                                    },
                                    'ФАРА': {
                                        row: 0,
                                        col: 2,
                                        direction: 'right'
                                    },
                                    'АРФА': {
                                        row: 1,
                                        col: 0,
                                        direction: 'down'
                                    }
                                },
                                letters: ["Ф", "Р", "А", "З", "А"]
                            },
                            {
                                keyData: {
                                    'ЛОТ': {
                                        row: 0,
                                        col: 1,
                                        direction: 'down'
                                    },
                                    'ОТДЕЛ': {
                                        row: 1,
                                        col: 1,
                                        direction: 'right'
                                    },
                                    'ДЕЛО': {
                                        row: 1,
                                        col: 3,
                                        direction: 'down'
                                    },
                                    'ЛЕТО': {
                                        row: 1,
                                        col: 5,
                                        direction: 'down'
                                    },
                                    'ТЕЛО': {
                                        row: 4,
                                        col: 0,
                                        direction: 'right'
                                    }
                                },
                                letters: ["Т", "Е", "Л", "О", "Д"]
                            },
                            {
                                keyData: {
                                    'ЛАК': {
                                        row: 0,
                                        col: 1,
                                        direction: 'right'
                                    },
                                    'ЛАД': {
                                        row: 1,
                                        col: 3,
                                        direction: 'right'
                                    },
                                    'КЛАД': {
                                        row: 1,
                                        col: 0,
                                        direction: 'down'
                                    },
                                    'КЛАДЬ': {
                                        row: 0,
                                        col: 3,
                                        direction: 'down'
                                    },
                                    'ДАЛЬ': {
                                        row: 4,
                                        col: 0,
                                        direction: 'right'
                                    }
                                },
                                letters: ["К", "Л", "А", "Д", "Ь"]
                            },
                            {
                                keyData: {
                                    'ДИВАН': {
                                        row: 0,
                                        col: 3,
                                        direction: 'down'
                                    },
                                    'ДВА': {
                                        row: 0,
                                        col: 3,
                                        direction: 'right'
                                    },
                                    'ВИД': {
                                        row: 2,
                                        col: 3,
                                        direction: 'right'
                                    },
                                    'ВИНА': {
                                        row: 3,
                                        col: 0,
                                        direction: 'right'
                                    },
                                    'НИВА': {
                                        row: 1,
                                        col: 0,
                                        direction: 'down'
                                    }
                                },
                                letters: ["Д", "И", "В", "А", "Н"]
                            }
                        ]
                    },
                    {
                        title: 'КРАСНОЕ МОРЕ',
                        status: 'block',
                        handlerId: "3",
                        handler: {
                            img: 'redSeaBg',
                            heading: 'КРАСНОЕ МОРЕ',
                            description: 'Красное море — внутреннее море Индийского океана, расположенное между Аравийским полуостровом и Африкой в тектонической впадине.'
                        },
                        levels: [
                            {
                                keyData: {
                                    'ТЕНОР': {
                                        row: 0,
                                        col: 2,
                                        direction: 'down'
                                    },
                                    'РОТ': {
                                        row: 0,
                                        col: 0,
                                        direction: 'right'
                                    },
                                    'ЕНОТ': {
                                        row: 1,
                                        col: 2,
                                        direction: 'right'
                                    },
                                    'ТОН': {
                                        row: 2,
                                        col: 0,
                                        direction: 'right'
                                    },
                                    'ТРОН': {
                                        row: 4,
                                        col: 1,
                                        direction: 'right'
                                    }
                                },
                                letters: ["Т", "Е", "Н", "О", "Р"]
                            },
                            {
                                keyData: {
                                    'ШАКАЛ': {
                                        row: 0,
                                        col: 2,
                                        direction: 'down'
                                    },
                                    'ШЛАК': {
                                        row: 0,
                                        col: 2,
                                        direction: 'right'
                                    },
                                    'ШКАЛА': {
                                        row: 3,
                                        col: 0,
                                        direction: 'right'
                                    },
                                    'КАША': {
                                        row: 1,
                                        col: 0,
                                        direction: 'down'
                                    },
                                    'ЛАК': {
                                        row: 2,
                                        col: 4,
                                        direction: 'down'
                                    }
                                },
                                letters: ["Ш", "А", "К", "А", "Л"]
                            }
                        ]
                    }
                ]
            },
            {
                country: 'ФРАНЦИЯ',
                imageName: 'locationFrance',
                status: 'process',
                sights: [
                    {
                        title: 'ЭЙФЕЛЕВА БАШНЯ',
                        status: 'process',
                        handlerId: "4",
                        handler: {
                            img: 'locationFrance',
                            heading: 'ЭЙФЕЛЕВА БАШНЯ',
                            description: 'Эйфелева башня — металлическая башня в центре Парижа, самая узнаваемая его архитектурная достопримечательность.'
                        },
                        levels: [
                            {
                                keyData: {
                                    'ТОРФ': {
                                        row: 2,
                                        col: 4,
                                        direction: 'down'
                                    },
                                    'ТРОН': {
                                        row: 0,
                                        col: 2,
                                        direction: 'down'
                                    },
                                    'ФТОР': {
                                        row: 2,
                                        col: 0,
                                        direction: 'down'
                                    },
                                    'ТОН': {
                                        row: 0,
                                        col: 2,
                                        direction: 'right'
                                    },
                                    'ФРОНТ': {
                                        row: 2,
                                        col: 0,
                                        direction: 'right'
                                    },
                                    'РОТ': {
                                        row: 5,
                                        col: 0,
                                        direction: 'right'
                                    },
                                    'ФОН': {
                                        row: 5,
                                        col: 4,
                                        direction: 'right'
                                    }
                                },
                                letters: ["Ф", "Р", "О", "Н", "Т"]
                            }
                        ]
                    },
                    {
                        title: 'СОБОР ПАРИЖСКОЙ БОГОМАТЕРИ',
                        status: 'process',
                        handlerId: "5",
                        handler: {
                            img: 'soborParish',
                            heading: 'СОБОР ПАРИЖСКОЙ БОГОМАТЕРИ',
                            description: 'Собор Парижской Богоматери — католический храм в центре Парижа, один из символов французской столицы.'
                        },
                        levels: [
                            {
                                keyData: {
                                    'ЯРМО': {
                                        row: 0,
                                        col: 1,
                                        direction: 'down'
                                    },
                                    'РОМ': {
                                        row: 3,
                                        col: 0,
                                        direction: 'down'
                                    },
                                    'ЛОМ': {
                                        row: 3,
                                        col: 3,
                                        direction: 'down'
                                    },
                                    'МОЛЬ': {
                                        row: 0,
                                        col: 4,
                                        direction: 'down'
                                    },
                                    'РОЯЛЬ': {
                                        row: 3,
                                        col: 0,
                                        direction: 'right'
                                    },
                                    'РОЛЬ': {
                                        row: 1,
                                        col: 3,
                                        direction: 'right'
                                    },
                                    'МОР': {
                                        row: 5,
                                        col: 3,
                                        direction: 'right'
                                    }
                                },
                                letters: ["Р", "О", "Я", "Л", "Ь", "М"]
                            }
                        ]
                    }
                ]
            }, 
            {
                country: 'ФРАНЦИЯ',
                imageName: 'locationFrance',
                status: 'block',
                sights: [
                    {
                        title: 'Пирамиды гизы',
                        status: 'process',
                        handlerId: "5",
                        handler: {
                            img: 'gizaBg',
                            heading: 'ПИРАМИДЫ ГИЗЫ',
                            description: 'Пирамиды Гизы - это древние усыпальницы - первое из семи чудес света.'
                        },
                        levels: [
                            {
                                keyData: {
                                    'НОС': { 
                                        row: 1,
                                        col: 1,
                                        direction: 'down'
                                    },
                                    'СОН': {
                                        row: 1,
                                        col: 0,
                                        direction: 'right'
                                    }
                                },
                                letters: ["C", "О", "Н"]
                            }
                        ]
                    }
                ]
            }
        ]
    }

    getLevel(level: number) {
        return this.countries[level];
    }
}


export {
    Levels,
    InterfeceLevelData,
    InterfaceСountry,
    InterfaceSights,
    InterfaceSightHandler
}