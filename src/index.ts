import { init } from './init';
import { DataType } from './types/data-type';

init({
    upstreamURL: 'http://106.12.192.227:3000/',
    upstreamType: DataType.HTML,
    // upstreamURL: 'http://106.12.192.227:3000/',
    // upstreamType: DataType.JSON,
    // upstreamURL: 'http://106.12.192.227:3000/',
    // upstreamType: DataType.JSON,
    diffFile: 'data/output.data',
    prevFile: 'data/existence.data',
    logFile: 'log/log.txt'
});