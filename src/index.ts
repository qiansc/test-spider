import { run } from './run';
import { resolve } from 'path';
import { logger } from './process-log';
import { scheduleJob } from 'node-schedule';
const EXIST_PATH = resolve('./data/existence.data');
const OUTPUT_PATH = resolve('./data/output.data');
const BASE_URL = 'http://127.0.0.1:3000';

// run({
//     path: `${BASE_URL}/list`,
//     contentType: 'HTML',
//     existPath: EXIST_PATH,
//     outputPath: OUTPUT_PATH
// });
try {
    let fetchTime = 1;
    scheduleJob('*/2 * * * * *', () => {
        console.info(`第${fetchTime}次请求数据`);
        run({
            path: `${BASE_URL}/json`,
            contentType: 'JSON',
            existPath: EXIST_PATH,
            outputPath: OUTPUT_PATH
        });
        fetchTime++;
    });
} catch (e) {
    logger.error(e);
}
