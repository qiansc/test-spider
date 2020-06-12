import fs from 'fs';
import path from 'path';
export function saveDataSync(data, filepath) {
    let newData = '';
    const filePath = path.resolve(filepath);
    switch (typeof data) {
        case 'string':
            newData = data;
            break;
        case 'object':
            if (Array.isArray(data)) {
                newData = data.join('\n');
            } else {
                newData = JSON.stringify(data);
            }
            break;
        default:
            newData = data;
    }
    fs.writeFileSync(filePath, newData, 'utf-8');
}