export enum DataTypes {
    'html',
    'json',
    'text'
}

export function parseData(content: string, type: DataTypes = DataTypes.html): Set<string> {
    switch(type) {
        case DataTypes.html: {
            return parseHtmlData(content);
        }
        case DataTypes.json: {
            return parseJsonData(content);
        }
        case DataTypes.text: {
            return parseTextData(content);
        }
    }
}

function parseHtmlData(content: string) {
    const startIndex = content.indexOf('<body');
    const endIndex = content.lastIndexOf('</body>')

    let c = content.slice(startIndex, endIndex);
    c = c.slice(c.indexOf('<li'), c.lastIndexOf('</li>'));

    const res = new Set() as Set<string>;
    c.split('\n').forEach(item => {
        const m = item.match(/<span class="item-id">(.+)<\/span>/);
        res.add(m[1]);
    });

    return res;
}

function parseTextData(content: string) {
    if (content === '') {
        return new Set() as Set<string>;
    }
    return new Set(content.split('\n'));
}

function parseJsonData(content: string) {
    const obj = JSON.parse(content);
    return new Set(obj.list) as Set<string>;
}