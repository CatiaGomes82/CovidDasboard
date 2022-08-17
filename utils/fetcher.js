export const fetcher = (url) => {
    return fetch(url).then(r => r.json());
};