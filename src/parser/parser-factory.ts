import { DataType } from '../types/data-type'
import { Parser } from './parser'
import { TextParser } from './text-parser'
import { HTMLParser } from './html-parser'
import { JSONParser } from './json-parser'

export function parserFactory(dataType: DataType): Parser {
    if (dataType === DataType.HTML) return new HTMLParser()
    if (dataType === DataType.TEXT) return new TextParser()
    if (dataType === DataType.JSON) return new JSONParser()
    throw new Error(`parser for ${dataType} not found`)
}
