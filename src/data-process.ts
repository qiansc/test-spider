import fs from 'fs';
import path from 'path';
import { JSDOM } from 'jsdom';
export function saveDataSync(data, filepath) {
    let newData = '';
    const filePath = path.resolve(filepath);
    switch (typeof data) {
        case 'string':
            newData = data;
            break;
        case 'object':
            if (Array.isArray(data)) {
                newData = data.join('\n');
            } else {
                newData = JSON.stringify(data);
            }
            break;
        default:
            newData = data;
    }
    fs.writeFileSync(filePath, newData, 'utf-8');
}
export function hasNewData(originData, newData) {
    if (!originData) {
        return newData;
    }
    if (!newData) {
        return originData;
    }
    const originType = typeof originData;
    const newDataType = typeof newData;
    let result: string[] = [];
    if (originType === newDataType) {
        switch (originType) {
            case 'object':
                if (Array.isArray(originData)) {
                    result = dataCut(originData, newData);
                }
            case 'string':
                break;
        }
        return result;
    } else {
        console.log('请输入相同类型的数据');
        return null;
    }
}
export function dataCut(originData: string[], newData: string[]): string[] {
    let result = [];
    const more = newData.length > originData.length ? newData : originData;
    const less = newData.length > originData.length ? originData : newData;
    more.forEach(item => {
        if (less.indexOf(item) === -1) {
            result.push(item);
        }
    });
    return result;
}
export function htmlProcess(html, selector) {
    const dom = new JSDOM(html);
    const result = dom.window.document.querySelectorAll(selector);
    return result;
}
export function getSrcDataFromHtml(html) {
    const li = htmlProcess(html, 'span.item-id');
    const data = Array.from(li).map(item => item.innerHTML);
    return data;
}