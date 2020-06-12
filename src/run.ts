import { fetchData } from './fetch-data';
import {
    dataCompare,
    getDataFromJSON,
    getDataFromHtml
} from './process-data';
import {
    saveDataSync
} from './process-file';
import { resolve } from 'path';
import { readFileSync } from 'fs';
interface ProcessOptions {
    path?: string;
    contentType?: 'HTML' | 'JSON';
    existPath?: string;
    outputPath?: string;
}

export async function run(options: ProcessOptions = { path: 'http://127.0.0.1:3000/', contentType: 'HTML', existPath: resolve(__dirname, '../data/existence.data'), outputPath: resolve(__dirname, '../data/output.data') }) {
    const { contentType, existPath, outputPath } = options;
    const content = await fetchData(options.path);
    const existData = readFileSync(existPath, 'utf-8').split('\n');
    let newData = [];
    switch (contentType) {
        case 'JSON':
            newData = getDataFromJSON(content);
            break;
        default:
            newData = getDataFromHtml(content);
            break;
    }
    const result = dataCompare(existData, newData);
    saveDataSync(newData, existPath);
    if (result !== newData) {
        saveDataSync(result, outputPath);
        const msg = !result.length ? '没有新增数据~' : `找到新增数据${result.length}条`;
        console.log(msg);
    } else {
        saveDataSync(newData, outputPath);
        const msg = `首次请求，已获取${newData.length}条数据。`
        console.log(msg);
    }
}
