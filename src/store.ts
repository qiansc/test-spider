import fs from 'fs';
import path from 'path';

const DATA_PATH = path.join(__dirname, '..', 'data', 'output.data');

export enum EPushResult {
    FAILD = -1,
    NOUPDATE = 0,
    SUCCEED = 1
}

export interface IStore {
    pushData<T>(data: T, dataGetter: IDataGetter): Promise<EPushResult>;
}

export interface IDataGetter {
    (data: object): string;
}

export class Store implements IStore {
    async pushData<T>(data: T, dataGetter: IDataGetter) {
        const newData = [];
        data.forEach(item => {
            const itemId = item.span.$t;
            if (!this.cache[itemId]) {
                newData.push(itemId);
                this.cache[itemId] = true;
            }
        });
        result = `${newData.join('\n')}\n`;
        return result;
        // 使用异步api
        fs.writeFileSync(DATA_PATH, data.toString(), {flag: 'a'});
        return EPushResult.SUCCEED;
    }
}
