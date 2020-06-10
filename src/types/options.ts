import { DataType } from './data-type'

export interface Options {
    logFile: string;
    diffFile: string;
    prevFile: string;
    upstreamURL: string;
    upstreamType: DataType;
}
