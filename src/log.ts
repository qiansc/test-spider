import { writeFileSync } from "fs";
import moment from 'moment';

export class ExceptionFilter {
    constructor(private path: string) {}
    public filter(err: LogErrorEvent) {
        switch(err.message) {
            case INFO.NewResult:
                console.log(err.message);
                break;
            case WARN.EmptyResult:
                console.log(err.message);
                this.saveWarn(err.message);
                break;
            case ERROR.FileReadError:
            case ERROR.FileWriteError:
            case ERROR.HTMLParseError:
            case ERROR.NetworkError:
                console.error(err);
                this.saveError(err.message);
                break;
            default:
                console.log(err);
                this.saveError(err.message);
        }
    }
    saveWarn(str: string) {
        let time = moment().format("YYYY-MM-DD hh:mm:ss");
        writeFileSync(
            this.path + '/spider.log',
            `${time}\t${str}\n`,
            {flag: 'as+'});
    }
    saveError(str: string) {
        let time = moment().format("YYYY-MM-DD hh:mm:ss");
        writeFileSync(
            this.path + '/spider.error.log',
            `${time}\t${str}\n`,
            {flag: 'as+'});
    }
}


export enum INFO {
    NewResult = '发现新内容！',
}

export enum WARN {
    EmptyResult = '未能找到！',
}

export enum ERROR {
    NetworkError = '网络错误！',
    HTMLParseError = '文本解析错误！',
    FileReadError = '文件读取错误！',
    FileWriteError = '文件写入错误！',
}

interface LogErrorEvent extends ErrorEvent {
    message: INFO | WARN | ERROR;
}