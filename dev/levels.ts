

interface InterfaceSights {

}

interface InterfaceСountry {
    country: string,
    imageName: string,
    status: "done" | "" | "",
    sights: Array<any>
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
                        status: '',
                        levels: [
                            {
                                words: ['Сон', "Нос"],
                                letters: ["C", "О", "Н"]
                            },
                        ]
                    },
                    {
                        title: 'БОЛЬШОЙ СФИНКС',
                        status: '',
                        levels: [
                            {
                                words: ['Сон', "Нос"],
                                letters: ["C", "О", "Н"]
                            },
                        ]
                    },
                    {
                        title: 'КРАСНОЕ МОРЕ',
                        status: '',
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
                        status: '',
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