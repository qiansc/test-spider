import { Injectable } from '@nestjs/common';
import { readFileSync, writeFileSync } from 'fs';
import { resolve } from 'path';

const DATA_PATH = resolve(__dirname, '../../example.data');

@Injectable()
export class DataService {
    getData() {
        const list = readFileSync(DATA_PATH).toString();
        return list.split('\n');
    }
    addData() {
        let data = this.getData();
        const newItem = new Date().getTime().toString().substring(2);
        data.unshift('m'  + newItem);
        writeFileSync(DATA_PATH, data.join('\n'));
        return data;
    }
}
