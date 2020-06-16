import { IStore } from './types';
import { writeFile } from './file-helper';
import { config } from './config';
import { Logger } from './logger';

export class Store implements IStore {
    private queue: Array<Array<string>> = [];
    private isPushing: boolean = false;
    constructor(private cache: {[key: string]: boolean}) {}

    pushData(data: Array<string>) {
        this.queue.push(data);
        this.doPush();
    }

    doPush() {
        if (this.isPushing) {
            return;
        }
        let data = this.queue.shift();
        if (!data) {
            this.isPushing = false;
            return;
        }
        const newData = [];
        console.log('------total count-----', data.length);
        data.forEach(item => {
            if (!this.cache[item]) {
                newData.push(item);
                this.cache[item] = true;
            }
        });
        console.log('------new data----', newData.length);
        if (newData.length === 0) {
            this.isPushing = false;
            return this.doPush();
        }
        const content = `${newData.join('\n')}\n`;
        // 使用异步api
        writeFile(config.dataPath, content)
            .catch(err => {
                // 缓存回退
                newData.forEach(item => {
                    this.cache[item] = false;
                });
                Logger.report({ erroType: 'promise', message: content });
            })
            .finally(() => {
                this.isPushing = false;
                this.doPush();
            });
    }
}
