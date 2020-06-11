import {fetchData as fetch} from './fetch-data';
import {IStore, EPushResult} from './store';
import { toJson } from 'xml2json';

interface DataStructure {
    html: {
        body: {
            div: {
                li: Array<{
                    span: {$t: string}
                }>
            }
        }
    }
}

function parse(input: string) {
    let result = [];
    const formatedData  = toJson(input, { object: true }) as DataStructure;
    const allData = formatedData.html.body.div.li;
    if (allData && allData.length > 0) {
        result = allData;
    }
    return result;
}

function dataGetter(item: {span: {$t: string}}) {
    return item.span.$t;
}


export class Spider {
    private cache: {[key:string]: boolean} = {};
    constructor(
        private period: number,
        private store: IStore
    ) {}

    run() {
        process.nextTick(() => {
            this.perform();
        });
    }

    stop() {}

    async perform() {
        const newData = await fetch();
        const parsedData = parse(newData);
        const result = await this.pushData(parsedData);
        if (result === EPushResult.SUCCEED) {
            setTimeout(this.perform.bind(this), this.period);
        }
    }
    
    pushData(data: Array<any>) {
        if (data.length === 0) {
            return Promise.resolve(EPushResult.SUCCEED)
        }
        return this.store.pushData(data, dataGetter);
    }
}