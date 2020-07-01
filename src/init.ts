import { fetchData } from './fetch-data';
import { parseData, DataTypes } from './parse-data';
import path from 'path';
import {promises} from 'fs';
const {readFile, writeFile} = promises;

const dataFilePath = path.resolve(__dirname, '../data/output.data');

export async function init() {
    const [items, lastItems] = await Promise.all([
        fetchAndParseData(),
        readAndParseFile()
    ]);

    const newData = diffData(lastItems, items);

    if (newData) {
        await writeFile(dataFilePath, [...newData].join('\n'));
    }
}

async function fetchAndParseData() {
    let htmlContent = await fetchData();
    const items = parseData(htmlContent, DataTypes.json);
    return items;
}

async function readAndParseFile() {
    const lastContent = await readFile(dataFilePath, 'utf-8');
    const lastItems = parseData(lastContent, DataTypes.text);
    return lastItems;
}

function diffData(last: Set<string>, current: Set<string>) {
    if (last.size === current.size) {
        return;
    }

    const newData = new Set() as Set<string>;

    current.forEach(item => {
        if (!last.has(item)) {
            newData.add(item);
        }
    });

    return newData;
}
