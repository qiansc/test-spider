import { readFileSync, writeFileSync } from 'fs';
import { Options } from './types/options';
import { DataList } from './types/data-list';
import { TextParser } from './parser/text-parser';

export function diffAndSave(options: Options, list: DataList) {
    const prevList = readPrevList(options.prevFile)
    const diff = findNewlyAdd(prevList, list)
    writeFileSync(options.diffFile, diff.join('\n'))
    writeFileSync(options.prevFile, list.join('\n'))
}

function readPrevList(file: string) {
    const parser = new TextParser();
    return parser.parse(readFileSync(file, 'utf8'))
}

function findNewlyAdd(prev: DataList, curr: DataList) {
    const prevSet = new Set(prev)
    return curr.filter(item => !prevSet.has(item))
}
