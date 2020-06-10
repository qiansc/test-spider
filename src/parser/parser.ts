import { DataList } from '../types/data-list'

export interface Parser {
    parse(raw: string): DataList
}
