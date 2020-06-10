import { DataList } from '../types/data-list'
import { Parser } from './parser'
import { Log } from '../log'

export class JSONParser {
    parse(raw: string): DataList {
        let json
        try {
            json = JSON.parse(raw);
        } catch(err) {
            Log.getOrCreate().error(`invalid JSON`)
        }
        return json.list
    }
}
