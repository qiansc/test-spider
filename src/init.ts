import { Spider } from './spider';
import { Store } from './store';
import { Logger } from './logger';
import { fetcher } from './fetcher';
import { config } from './config';
import { readFileSync } from './file-helper';

function loadData(dataPath: string): {[key:string]: boolean} {
    let result = {};
    let content = readFileSync(dataPath);
    content.split('\n').forEach(str => {
        if (str.trim().length > 0) {
            result[str] = true;
        }
    });
    return result;
}

export async function init() {
    process.nextTick(() => {
        const previousData = loadData(config.dataPath);
        const spider = new Spider({
            store: new Store(previousData),
            fetcher: new fetcher(),
        });
        spider.run();
    });
    process.on('uncaughtException', (err, origin) => {
        Logger.report({
            erroType: 'global exception\n',
            message: `Caught exception: ${err}\nException origin: ${origin}\n`,
        });
    });
    process.on('unhandledRejection', (reason, promise) => {
        Logger.report({
            erroType: 'unhandled promise\n',
            message: `Unhandled Rejection at: ${promise}\nReason: ${reason}\n`,
        });
    });
}
