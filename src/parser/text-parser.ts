import { DataList } from '../types/data-list'
import { Parser } from './parser'
import { Log } from '../log'

export class TextParser {
    parse(raw: string): DataList {
        raw = raw.trim()
        return raw ? raw.split(/\s+/) : []
    }
}
