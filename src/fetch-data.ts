import fetch from 'xfetch';

export function fetchData(url: string) {
    return fetch(url, {
        "headers": {
        "accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
        "accept-language": "ja-jp;q=0.9,ja;q=0.8,en;q=0.7",
        "cache-control": "max-age=0",
        "sec-fetch-dest": "document",
        "sec-fetch-mode": "navigate",
        "sec-fetch-site": "none",
        "sec-fetch-user": "?1",
        "upgrade-insecure-requests": "1",
        "cookie": "merCtx=\"\"; PHPSESSID=83n08v847b0jut2q35p1bt2koj; _gcl_au=1.1.709189126.1587368559; _ga=GA1.2.1136897187.1587368561; _fbp=fb.1.1587368562580.2036898240; G_ENABLED_IDPS=google; _gaexp=GAX1.2.aBDDFCYKQkKyvgc2RaugJA.18473.1; _gid=GA1.2.1849644588.1591575997; _gat=1"
        },
        "referrerPolicy": "no-referrer-when-downgrade",
        "body": null,
        "method": "GET",
        "mode": "cors"
    });
}