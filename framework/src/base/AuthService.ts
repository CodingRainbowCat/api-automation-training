import "dotenv/config";
import { ServiceBase } from "./ServiceBase.js";
import { Response } from "../models/responses/Response.js";
import { CredentialsModel } from "../models/request/CredentialsModel.js";
import { SessionResponse } from "../models/responses/SessionResponse.js";
import { RegisterResponse } from "../models/responses/RegisterResponse.js";
import { AxiosRequestConfig } from "axios";
import { SessionManager } from "../base/SessionManager.js";

export class AuthService extends ServiceBase {
  private static classInstance?: AuthService;

  public constructor() {
    super("/auth");
  }

  public static getInstance() {
    if (!this.classInstance) {
      this.classInstance = new AuthService();
    }

    return this.classInstance;
  }

  async register(credentials: CredentialsModel | any, config = this.defaultConfig): Promise<Response<RegisterResponse>> {
    return await this.post<RegisterResponse>(`${this.url}/register`, credentials, config);
  }

  async logIn(credentials: CredentialsModel | any, config = this.defaultConfig): Promise<Response<SessionResponse>> {
    return await this.post<SessionResponse>(`${this.url}/logIn`, credentials, config);
  }

  async refresh(refreshToken: string | any, config = this.defaultConfig): Promise<Response<SessionResponse>> {
    return await this.post<SessionResponse>(`${this.url}/refresh`, refreshToken, config);
  }

  async getConfig(credentials: CredentialsModel | any): Promise<AxiosRequestConfig> {
    const sessionStatus = SessionManager.getCachedAccessToken(credentials); 
    let accessToken = '';
    if (sessionStatus === null) {
        const sessionResponse = await this.logIn(credentials);
        SessionManager.storeToken(credentials, sessionResponse.data.accessToken, sessionResponse.data.refreshToken);
        accessToken = sessionResponse.data.accessToken;
    }
    else if (sessionStatus === 'expired') {
        const sessionResponse = await this.refresh(SessionManager.getCachedRefreshToken(credentials));
        SessionManager.storeToken(credentials, sessionResponse.data.accessToken, sessionResponse.data.refreshToken);
        accessToken = sessionResponse.data.accessToken;
    }
    else {
        accessToken = sessionStatus;
    }
    
    const config = {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    }

    return config;
  }
}