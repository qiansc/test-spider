import { Spider } from './spider';
import {Store} from './store'
const period = 4000; 

export async function init() {
    const spider = new Spider(period, new Store());
    spider.run();
}
