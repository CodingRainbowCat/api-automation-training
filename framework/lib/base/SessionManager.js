export class SessionManager {
    static getCachedToken(username, password) {
        const cacheKey = `${username}:${password}`;
        const cachedData = SessionManager.authTokenCache[cacheKey];
        if (cachedData) {
            const currentTime = Date.now();
            const tokenAge = currentTime - cachedData.timestamp;
            if (tokenAge < SessionManager.tokenExpiryDuration) {
                return cachedData.token;
            }
            else {
                delete SessionManager.authTokenCache[cacheKey];
            }
        }
        return null;
    }
    static storeToken(username, password, token) {
        const cacheKey = `${username}:${password}`;
        SessionManager.authTokenCache[cacheKey] = {
            token,
            timestamp: Date.now(),
        };
    }
}
SessionManager.authTokenCache = {};
SessionManager.tokenExpiryDuration = 15 * 60 * 1000; // 15 minutes
