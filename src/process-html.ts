import { JSDOM } from 'jsdom';
export function htmlProcess(html, selector) {
    const dom = new JSDOM(html);
    const result = dom.window.document.querySelectorAll(selector);
    return result;
}