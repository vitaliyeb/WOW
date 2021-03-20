
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
                            description: 'Пирамиды Гизы - это древние усыпальницы - первое из семи чудес света.'
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
                                    'ГИЗ': {
                                        row: 0,
                                        col: 1,
                                        direction: 'down'
                                    },
                                    'ГЗИ': {
                                        row: 0,
                                        col: 0,
                                        direction: 'right'
                                    }
                                },
                                letters: ["Г", "И", "З"]
                            },
                            {
                                keyData: {
                                    'ГИЗ': {
                                        row: 0,
                                        col: 1,
                                        direction: 'down'
                                    },
                                    'ГЗИ': {
                                        row: 0,
                                        col: 0,
                                        direction: 'right'
                                    }
                                },
                                letters: ["Г", "И", "З"]
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
            },
            {
                country: 'ФРАНЦИЯ',
                imageName: 'locationFrance',
                status: 'block',
                sights: [
                    {
                        title: 'Пирамиды гизы',
                        status: 'process',
                        handlerId: "4",
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
                                        direction: 'left'
                                    }
                                },
                                letters: ["C", "О", "Н"]
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
                                        direction: 'left'
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