import { Ifetcher, fetcherReturnType } from './types';
import { toJson } from 'xml2json';
import { fetchData } from './fetch-data';

interface HTMLStructure {
    html: {
        body: {
            div: {
                li: Array<{
                    span: {$t: string}
                }>
            }
        }
    }
}

interface JSONStructure {
    status: number;
    list: Array<string>;
}

const dataParsers = {
    html(data: string): fetcherReturnType  {
        let result = [];
        const formatedData  = toJson(data, { object: true }) as HTMLStructure;
        const allData = formatedData.html.body.div.li;
        if (allData && allData.length > 0) {
            result = allData;
        }
        return result.map(item => item.span.$t);
    },
    json(data: string): fetcherReturnType {
        const formatedData = JSON.parse(data) as JSONStructure;
        return formatedData.list;
    },
}

const sources = {
    html: 'http://106.12.192.227:3000/list',
    json: 'http://106.12.192.227:3000/json',
}

export class fetcher implements Ifetcher{
    fetchAndParse(): Promise<Array<string>> {
        const fetchType = 'html';
        const datasource = sources[fetchType];
        const parser = dataParsers[fetchType];
        return fetchData(datasource).then(res => {
            return parser(res);
        });
    }
}