import { fetchData } from './fetch-data';
// import { writeFileSync, readFileSync } from 'fs';
// import { resolve } from 'path';

interface ProcessOptions{}

export async function init(options?: ProcessOptions) {
    let htmlContent = await fetchData();
    
    // start your code here
    console.log(htmlContent);

    if (false) {
        getcha();
    } else {
        console.log('未能找到！');
    }
}

function getcha() {
    console.log('发现了新增内容！');
}

// 以下是读写文件示例，__dirname指的是当前文件的工作目录
// writeFileSync('../log/test.log', '测试文本');
// const txt = readFileSync('.../log/test.log');
// const filePath = resolve(__dirname, '../log/test.log');
// console.log(filePath, txt);
