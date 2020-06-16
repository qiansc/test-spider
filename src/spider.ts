import {IStore, Ifetcher} from './types';
import { config } from './config';

interface ISpiderOptions {
    store: IStore;
    fetcher: Ifetcher;
}

export class Spider {
    private store: IStore;
    private fetcher: Ifetcher;
    private period: number;
    constructor(options: ISpiderOptions) {
        this.store = options.store;
        this.fetcher = options.fetcher;
        this.period = config.period;
    }

    run() {
        process.nextTick(() => {
            this.perform();
        });
    }

    async perform() {
        this.fetcher.fetchAndParse()
            .then(res => {
                this.pushData(res);
            })
            .finally(() => {
                setTimeout(this.perform.bind(this), this.period);
            });
    }
    
    pushData(data: Array<string>): Promise<boolean> {
        if (data.length === 0) {
            return Promise.resolve(true)
        }
        this.store.pushData(data);
    }
}