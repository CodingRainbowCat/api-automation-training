import { CredentialsModel } from "../models/request/CredentialsModel";

export class SessionManager {
  private static authTokenCache: {
    [key: string]: { accessToken: string; refreshToken: string; timestamp: number } | null;
  } = {};

  private static tokenExpiryDuration = 15 * 60 * 1000; // 15 minutes

  static getCachedAccessToken(credentials: CredentialsModel): string | null {
    const cacheKey = `${credentials.username}:${credentials.password}`;
    const cachedData = SessionManager.authTokenCache[cacheKey];

    if (cachedData) {
      const currentTime = Date.now();
      const tokenAge = currentTime - cachedData.timestamp;

      if (tokenAge < SessionManager.tokenExpiryDuration) {
        return cachedData.accessToken;
      } else {
        return 'expired';
      }
    }

    return null;
  }

  static getCachedRefreshToken(credentials: CredentialsModel): string | null {
    const cacheKey = `${credentials.username}:${credentials.password}`;
    const cachedData = SessionManager.authTokenCache[cacheKey];

    if (cachedData) {
      const currentTime = Date.now();
      const tokenAge = currentTime - cachedData.timestamp;

      if (tokenAge < SessionManager.tokenExpiryDuration) {
        return cachedData.accessToken;
      } else {
        return 'expired';
      }
    }

    return null;
  }

  static storeToken(credentials: CredentialsModel, accessToken: string, refreshToken: string): void {
    const cacheKey = `${credentials.username}:${credentials.password}`;
    SessionManager.authTokenCache[cacheKey] = {
      accessToken,
      refreshToken,
      timestamp: Date.now(),
    };
  }
}
