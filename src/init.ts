import { fetchData } from './fetch-data';
import {
    saveDataSync,
    hasNewData,
    htmlProcess,
    getSrcDataFromHtml
} from './data-process';
import fs from 'fs';
import path from 'path';
// import { writeFileSync, readFileSync } from 'fs';
// import { resolve } from 'path';

interface ProcessOptions { }

export async function init(options?: ProcessOptions) {
    let htmlContent = await fetchData();
    const existencePath = path.resolve('./data/existence.data');
    const existenceData = fs.readFileSync(existencePath, 'utf-8').split('\n');

    const datas = getSrcDataFromHtml(htmlContent);
    const originData = existenceData.length ? existenceData : datas;

    fs.writeFileSync(existencePath, originData.join('\n'));
    console.log(datas, originData, existenceData);
    
    const hasNew = hasNewData(datas, originData);
    if (hasNew && hasNew.length > 0) {
        getcha(hasNew);
    } else {
        console.log('未能找到！');
    }
}

function getcha(data) {
    const outputPath = path.resolve('./data/output.data');
    console.log('发现了新增内容！');
    saveDataSync(data, outputPath);
}

// 以下是读写文件示例，__dirname指的是当前文件的工作目录
// writeFileSync('../log/test.log', '测试文本');
// const txt = readFileSync('.../log/test.log');
// const filePath = resolve(__dirname, '../log/test.log');
// console.log(filePath, txt);
