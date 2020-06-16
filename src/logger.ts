import { writeFile } from './file-helper';
import { config } from './config';

interface ILoggerOption {
    erroType: string;
    message: string;
}

export class Logger {
    static report(option: ILoggerOption): Promise<any> {
        let { erroType = 'default', message } = option;
        const content = [erroType, message].join('\n');
        return writeFile(config.logPath, content);
    }
}