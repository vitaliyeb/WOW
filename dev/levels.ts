

interface InterfaceSights {

}

interface InterfaceСountry {
    country: string,
    status: "" | "" | "",
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
                country: 'египет',
                status: '',
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
    Levels
}