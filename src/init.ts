import { fetchData } from './fetch-data';
import { parserFactory } from './parser/parser-factory';
import { diffAndSave } from './diff';
import { Options } from './types/options';
import { DataList } from './types/data-list';
import { Log } from './log'

export async function init(options: Options) {
    prepare(options.logFile)
    runTask(options)
}

function prepare(logFile: string) {
    Log.getOrCreate(logFile)
}

function runTask(options: Options) {
    const parser = parserFactory(options.upstreamType);

    return Promise.resolve()
        .then(() => fetchData(options.upstreamURL))
        .then((content: string) => parser.parse(content))
        .then((list: DataList) => diffAndSave(options, list))
        .catch((err: Error) => {
            Log.getOrCreate().error('error parse', err.stack)
        })
}