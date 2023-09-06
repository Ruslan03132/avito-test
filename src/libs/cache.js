import { CACHE_GAMES, CACHE_GAMES_EXPIRED } from "../consts/cache";

function getCache() {
    const cacheGames = localStorage.getItem(CACHE_GAMES);
    if (!cacheGames) {
        return null;
    }
    return JSON.parse(cacheGames);
}

function getItemFromCache(id) {
    const cache = getCache();
    if (cache) {
        const currentItem = cache[id];
        if (currentItem) {
            if (Date.now() - currentItem.time > CACHE_GAMES_EXPIRED) {
                return null;
            }
            return currentItem.response;
        }
    }
}

function setItemToCache(id, jsonData) {
    const cache = getCache() || {};
    cache[id] = { response: jsonData, time: Date.now() };
    localStorage.setItem(CACHE_GAMES, JSON.stringify(cache));
}

export { getItemFromCache, setItemToCache };
