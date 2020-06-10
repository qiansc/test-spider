import { appendFile } from 'fs'

export class Log {
    private static instance: Log
    private file: string

    constructor(file: string) {
        if (!file) throw new Error('file not specifed for Log')
        this.file = file
    }

    static getOrCreate(file?: string) {
        if (!Log.instance) Log.instance = new Log(file)
        return Log.instance
    }

    log(...args: string[]) {
        console.log(new Date(), ...args)
    }

    error(...args: string[]) {
        console.error(new Date(), ...args)
        appendFile(this.file, args.join(' '), (err: Error) => {
            console.error(`error writing ${this.file}: ${err.stack}`)
        })
    }
}
