import { AxiosResponse, type AxiosRequestConfig } from "axios";
import { ApiClient } from "./ApiClient.js";
import { Response } from "../models/responses/Response";
import { SessionManager } from "./SessionManager.js";
import { CredentialsModel } from "../models/request/CredentialsModel";
import { SessionResponse } from "../models/responses/SessionResponse.js";

export class ServiceBase {
  private api: ApiClient;
  protected url: string;
  protected defaultConfig: AxiosRequestConfig;

  constructor(endpointPath: string) {
    this.api = ApiClient.getInstance();
    this.url = this.baseUrl + endpointPath;
    this.defaultConfig = {};
  }

  get baseUrl(): string {
    return process.env["BASEURL"] ?? "";
  }

  set setDefaultConfig(config: AxiosRequestConfig) {
    this.defaultConfig = config;
  }
  
  async authenticate(credentials: CredentialsModel): Promise<void> {
    const sessionStatus = SessionManager.getCachedAccessToken(credentials); 
    console.log('Session status:', sessionStatus);
    console.log('credentials:', credentials);
    let accessToken = '';
    if (sessionStatus === null) {
        console.log('URL: ' + this.url);
        const sessionResponse = await this.post<SessionResponse>(`${this.baseUrl}/auth/logIn`, credentials, this.defaultConfig);
        SessionManager.storeToken(credentials, sessionResponse.data.accessToken, sessionResponse.data.refreshToken);
        accessToken = sessionResponse.data.accessToken;
        console.log('Session response:', sessionResponse.data);
    }
    else if (sessionStatus === 'expired') {
        const sessionResponse = await this.post<SessionResponse>(`${this.baseUrl}/auth/refresh`, SessionManager.getCachedRefreshToken(credentials), this.defaultConfig);
        SessionManager.storeToken(credentials, sessionResponse.data.accessToken, sessionResponse.data.refreshToken);
        accessToken = sessionResponse.data.accessToken;
        console.log('Session response:', sessionResponse.data);
    }
    else {
        accessToken = sessionStatus;
        console.log('Session status 2:', sessionStatus);
    }
    
    const config = {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    };
    this.setDefaultConfig = config;
  }

  protected async get<T>(
    url: string,
    config: AxiosRequestConfig = this.defaultConfig,
  ): Promise<Response<T>> {
    const startTime = Date.now();
    const response = await this.api.client.get<T>(url, config);
    const endTime = Date.now();

    const customResponse: Response<T> = this.buildResponse<T>(endTime, startTime, response);
    return customResponse;
  }

  protected async post<T>(
    url: string,
    data: unknown,
    config: AxiosRequestConfig = this.defaultConfig,
  ): Promise<Response<T>> {
    const startTime = Date.now();
    const response = await this.api.client.post<T>(url, data, config);
    const endTime = Date.now();

    const customResponse: Response<T> = this.buildResponse<T>(endTime, startTime, response);
    return customResponse;
  }

  protected async put<T>(
    url: string,
    data: unknown,
    config: AxiosRequestConfig = this.defaultConfig,
  ): Promise<Response<T>> {
    const startTime = Date.now();
    const response = await this.api.client.put<T>(url, data, config);
    const endTime = Date.now();

    const customResponse: Response<T> = this.buildResponse<T>(endTime, startTime, response);
    return customResponse;
  }

  protected async patch<T>(
    url: string,
    data: unknown,
    config: AxiosRequestConfig = this.defaultConfig,
  ): Promise<Response<T>> {
    const startTime = Date.now();
    const response = await this.api.client.patch<T>(url, data, config);
    const endTime = Date.now();

    const customResponse: Response<T> = this.buildResponse<T>(endTime, startTime, response);
    return customResponse;
  }

  protected async delete<T>(
    url: string,
    config: AxiosRequestConfig = this.defaultConfig,
  ): Promise<Response<T>> {
    const startTime = Date.now();
    const response = await this.api.client.delete<T>(url, config);
    const endTime = Date.now();

    const customResponse: Response<T> = this.buildResponse<T>(endTime, startTime, response);
    return customResponse;
  }

  protected async head<T>(
    url: string,
    config: AxiosRequestConfig = this.defaultConfig,
  ): Promise<Response<T>> {
    const startTime = Date.now();
    const response = await this.api.client.head<T>(url, config);
    const endTime = Date.now();

    const customResponse: Response<T> = this.buildResponse<T>(endTime, startTime, response);
    return customResponse;
  }

  protected async options<T>(
    url: string,
    config: AxiosRequestConfig = this.defaultConfig,
  ): Promise<Response<T>> {
    const startTime = Date.now();
    const response = await this.api.client.options<T>(url, config);
    const endTime = Date.now();

    const customResponse: Response<T> = this.buildResponse<T>(endTime, startTime, response);
    return customResponse;
  }

  private buildResponse<T>(endTime: number, startTime: number, response: AxiosResponse<T>) {
    const responseTime = endTime - startTime;

    const customResponse: Response<T> = {
      data: response.data,
      status: response.status,
      headers: response.headers,
      responseTime: responseTime,
    };
    return customResponse;
  }
}
