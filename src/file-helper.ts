import fs from 'fs';

export function writeFile(path: string, content: string, flag='a') {
    return new Promise((res, rej) => {
        fs.writeFile(path, content, { flag }, function(err) {
            if (err) {
                return rej(err);
            }
            res();
        });
    });
}

export function readFileSync(path: string) {
    return fs.readFileSync(path, { encoding: 'utf-8' });
}