import { fetchData } from './fetch-data';

interface ProcessOptions{}

export async function init(options?: ProcessOptions) {
    let htmlContent = await fetchData();
    
    // start your code here

    if (false) {
        getcha();
    } else {
        console.log('未能找到！');
    }
}

function getcha() {
    console.log('发现了新增内容！');
}