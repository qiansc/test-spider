import { DataList } from '../types/data-list'
import { Parser } from './parser'

export class HTMLParser {
    parse(raw: string): DataList {
        // 如果输入格式像现在这么简单是 OK 的，
        // 如果会复杂需要引入 jsdom 等
        let rSpan = /<span class="item-id">(m\d+)<\/span>/g
        let match
        let list = []
        while(match = rSpan.exec(raw)) list.push(match[1])
        return list
    }
}
