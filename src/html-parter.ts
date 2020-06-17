import { JSDOM } from 'jsdom';
import { ERROR } from './log';
export class HtmlPaser {
    private document: Document;
    constructor(html: string) {
        try {
            this.document = (new JSDOM(html)).window.document;
        } catch{
            throw new Error(ERROR.HTMLParseError);
        }

    }
    public getItemList() {
        let itemList: string[] = [];
        this.document.querySelectorAll('li .item-id').forEach(div => {
            itemList.push(div.innerHTML);
        });
        return itemList;
    }

}