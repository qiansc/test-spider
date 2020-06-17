import { fetchData } from './fetch-data';
import { Store } from './store';
import { HtmlPaser } from './html-parter';
import { WARN, ERROR, INFO } from './log';

interface ProcessOptions{
    outputPath: string;
    existPath: string;
    url: string;
}

export async function init(options: ProcessOptions) {
    // 获取文本
    let htmlContent = await fetchData(options.url).catch(err => {
        throw new Error(ERROR.NetworkError);
    });
    
    // 转换为item数据列
    let itemList = new HtmlPaser(htmlContent).getItemList();

    // 读取上次缓存数据，并进行merge操作（但不立即存储）
    let store = new Store(options.existPath);
    let newItemList = store.merge(itemList);

    // 判断merge结果，新增的条数
    if (newItemList.length > 0) {
        getcha();
        console.log(newItemList.length + '条');
        // 将merge结果存储落盘，供下次使用
        await store.save();
        // 将新增结果落盘到output
        new Store(options.outputPath).save(newItemList);
    } else {
        throw new Error(WARN.EmptyResult);
    }
}

function getcha() {
    console.log(INFO.NewResult);
}