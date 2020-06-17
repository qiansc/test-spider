import { init } from './init';
import { ExceptionFilter } from './log';
import { resolve } from 'path';

const EXIST_PATH = resolve(__dirname, '../data/existence.data');
const OUTPUT_PATH = resolve(__dirname, '../data/output.data');
const DATA_URL = 'http://106.12.192.227:3000/';
const LOG_PATH = resolve(__dirname, '../log');

const exceptionFilter = new ExceptionFilter(LOG_PATH);

init({
    existPath: EXIST_PATH,
    outputPath: OUTPUT_PATH,
    url: DATA_URL,
}).catch(err => {
    exceptionFilter.filter(err);
});