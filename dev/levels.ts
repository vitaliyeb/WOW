

interface InterfaceSights {
    title: string,
    status: "done" | "process",
    levels: any
}

interface InterfaceСountry {
    country: string,
    imageName: string,
    status: "done" | "process",
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
                        levels: [
                            {
                                words: ['Сон', "Нос"],
                                letters: ["C", "О", "Н"]
                            },
                        ]
                    },
                    {
                        title: 'БОЛЬШОЙ СФИНКС',
                        status: 'done',
                        levels: [
                            {
                                words: ['Сон', "Нос"],
                                letters: ["C", "О", "Н"]
                            },
                        ]
                    },
                    {
                        title: 'КРАСНОЕ МОРЕ',
                        status: 'done',
                        levels: [
                            {
                                words: ['Сон', "Нос"],
                                letters: ["C", "О", "Н"]
                            },
                        ]
                    }
                ]
            },
            {
                country: 'египет',
                imageName: 'locationFrance',
                status: 'done',
                sights: [
                    {
                        title: 'Пирамиды гизы',
                        status: 'process',
                        levels: [
                            {
                                words: ['Сон', "Нос"],
                                letters: ["C", "О", "Н"]
                            },
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
    InterfaceСountry
}