import { Injectable } from '@nestjs/common';
import { DataService } from '../data/data.service';

@Injectable()
export class ListService {
    constructor(private dataService: DataService) {

    }
    getHtml() {
        const itemHtml = [];
        this.dataService.getData().forEach(item => {
            itemHtml.push(`<li><span class="item-id">${item}</span></li>`);
        });
        return `
        <!DOCTYPE html>
        <html>
            <head>
                <meta http-equiv="X-UA-Compatible" content="IE=edge" />
                <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0"/>
                <meta name="apple-mobile-web-app-capable" content="yes" />
                <title>TEST API</title>
            </head>
        
            <body class="">
                <div>
                    ${itemHtml.join('\n')}
                </div>
            </body>
        
        </html>
        
        `;
    }
    getJson() {
        return {
            status: 0,
            list: this.dataService.getData(),
            length: this.dataService.getData().length
        }
    }
    getLine() {
        return this.dataService.getData().join('\n');
    }
    addItem() {
        return this.dataService.addData().join('\n');
    }
}
