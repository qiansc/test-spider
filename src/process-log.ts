import {
    createLogger,
    transports
} from 'winston';
import { resolve } from 'path';
const LOG_DIR_PATH = resolve(__dirname, process.env.LOG_DIR_PATH ? process.env.LOG_DIR_PATH : '../log');

export const logger = createLogger({
    transports: [
        new transports.Console(),
        new transports.File({
            filename: `${LOG_DIR_PATH}/error.log`,
            level: 'error'
        })
    ]
});
