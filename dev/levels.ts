
interface InterfeceLevelData {
    keyData: {
        [key: string]: {
            row: number;
            col: number;
            direction: string;
        };
    };
    letters: Array<string>
}

interface InterfaceSights {
    title: string,
    status: "done" | "process",
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
                status: 'done',
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
                                    'НОС': { 
                                        row: 0,
                                        col: 1,
                                        direction: 'down'
                                    },
                                    // 'СОН': {
                                    //     row: 1,
                                    //     col: 0,
                                    //     direction: 'left'
                                    // }
                                },
                                letters: ["C", "О", "Н"]
                            }
                        ]
                    },
                    {
                        title: 'БОЛЬШОЙ СФИНКС',
                        status: 'done',
                        handlerId: "2",
                        handler: {
                            img: 'bigSfinxBg',
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
                    },
                    {
                        title: 'КРАСНОЕ МОРЕ',
                        status: 'done',
                        handlerId: "3",
                        handler: {
                            img: 'redSeaBg',
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
                status: 'process',
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