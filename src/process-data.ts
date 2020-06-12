import {
    htmlProcess
} from './process-html';
import { logger } from './process-log';
export function dataCompare(originData, newData): string[] {
    let result: string[] = [];
    if (!originData.length || !originData[0]) {
        return newData;
    }
    const originType = typeof originData;
    const newDataType = typeof newData;
    if (originType === newDataType) {
        switch (originType) {
            case 'object':
                if (Array.isArray(originData)) {
                    result = getDiffData(originData, newData);
                }
            case 'string':
                break;
        }
        return result;
    } else {
        logger.error(dataCompare.name, '请输入相同类型的数据');
        return [];
    }
}
export function getDiffData(originData: string[], newData: string[]): string[] {
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
export function getDataFromJSON(content: string): string[] {
    let data = [];
    try {
        data = JSON.parse(content).list;
    } catch (error) {

    }
    return data;
}
export function getDataFromHtml(html) {
    const li = htmlProcess(html, 'span.item-id');
    const data = Array.from(li).map(item => item.innerHTML);
    return data;
}