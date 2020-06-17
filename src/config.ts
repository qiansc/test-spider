import path from 'path';

export const config = {
    period: 4000,
    dataPath:  path.join(__dirname, '..', 'data', 'output.data'),
    logPath: path.join(__dirname, '..', 'log', 'error'),
}